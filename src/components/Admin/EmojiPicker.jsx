const EMOJIS = [
    "🧠", "💭", "🧩", "⚡", "🔬", "🧬", "🩺", "📋", "💊", "🚑",
    "😊", "😢", "😡", "😨", "😱", "😳", "🥲", "😔", "😴", "🤔",
    "😰", "😭", "🥰", "😤", "😶", "🤯", "😵", "🫠", "🙃", "😬",
    "⏰", "🕐", "🌙", "💤", "🔥", "🚨", "⚠️", "💥", "🌊", "⚖️",
    "❤️", "💔", "👥", "🤝", "👋", "👶", "🧒", "🧓", "👨‍👩‍👧", "🌈",
    "🌸", "🤰", "🚬", "🍷", "💉", "🎭", "🌍", "📊", "📈", "📖",
    "✏️", "🎓", "👁️", "👂", "👃", "🖐️", "🛠️", "💬", "🤲", "🐀",
    "🐕", "🍽️", "🏃", "💪", "🧘", "🎯", "🔑", "🧭", "🗝️", "🪞"
];

function EmojiPicker({ value, onChange }) {

    return (

        <div style={{ marginBottom: 15 }}>

            <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>

                Ikon: {value || "—"}

            </label>

            <input

                placeholder="Klistra in eller skriv valfri emoji"

                value={value}

                onChange={event => onChange(event.target.value)}

                style={{

                    width: "100%",

                    padding: 10,

                    borderRadius: 10,

                    border: "1px solid #ddd",

                    marginBottom: 8

                }}

            />

            <div

                style={{

                    display: "flex",

                    flexWrap: "wrap",

                    gap: 6,

                    maxHeight: 140,

                    overflowY: "auto",

                    padding: 8,

                    border: "1px solid #eee",

                    borderRadius: 10

                }}

            >

                {

                    EMOJIS.map(emoji => (

                        <button

                            type="button"

                            key={emoji}

                            onClick={() => onChange(emoji)}

                            style={{

                                fontSize: 20,

                                width: 36,

                                height: 36,

                                border: value === emoji ? "2px solid #214c9d" : "1px solid #ddd",

                                borderRadius: 8,

                                background: "white",

                                cursor: "pointer"

                            }}

                        >

                            {emoji}

                        </button>

                    ))

                }

            </div>

        </div>

    );

}

export default EmojiPicker;
