import streamlit as st
from openai import OpenAI

# 🔑 Mets ta clé ici
client = OpenAI(api_key="TA_CLE_API_ICI")

st.set_page_config(page_title="Blessing AI Ultra", page_icon="🤖")

st.title("🤖 Blessing AI Ultra Pro")

# -------------------------
# MEMORY CHAT
# -------------------------
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": "Tu es Blessing AI, un assistant intelligent, utile et parlant français."}
    ]

# -------------------------
# INPUT USER
# -------------------------
user_input = st.text_input("💬 Parle à ton assistant")

if user_input:
    st.session_state.messages.append({"role": "user", "content": user_input})

    # 🤖 appel IA
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=st.session_state.messages
    )

    answer = response.choices[0].message.content

    st.session_state.messages.append({"role": "assistant", "content": answer})

# -------------------------
# DISPLAY CHAT
# -------------------------
for msg in st.session_state.messages[1:]:
    if msg["role"] == "user":
        st.markdown(f"👤 **Toi:** {msg['content']}")
    else:
        st.markdown(f"🤖 **Blessing AI:** {msg['content']}")