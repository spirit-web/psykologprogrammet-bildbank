import { useState } from "react";

import { supabase } from "../../services/supabase";

function LoginForm() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();

        setLoading(true);

        setError("");

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

        setLoading(false);

        if (signInError) {

            setError("Fel e-post eller lösenord.");

        }

    }

    return (

        <div style={{ maxWidth: 400, margin: "80px auto", padding: 40 }}>

            <h1>🔒 Logga in</h1>

            <p style={{ color: "#666" }}>Endast administratören kan komma åt den här sidan.</p>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="E-post"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd", marginBottom: 12 }}
                />

                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd", marginBottom: 12 }}
                />

                {error && <p style={{ color: "#c0392b" }}>{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", background: "#173B78", color: "white", border: "none", borderRadius: 10, padding: 14, fontWeight: 600, cursor: "pointer" }}
                >
                    {loading ? "Loggar in..." : "Logga in"}
                </button>

            </form>

        </div>

    );

}

export default LoginForm;
