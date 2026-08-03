import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";
import LoginForm from "./LoginForm";

function RequireAuth({ children }) {

    const [session, setSession] = useState(undefined);

    useEffect(() => {

        supabase.auth.getSession().then(({ data }) => setSession(data.session));

        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {

            setSession(newSession);

        });

        return () => listener.subscription.unsubscribe();

    }, []);

    if (session === undefined) {

        return <p style={{ textAlign: "center", marginTop: 80 }}>Laddar...</p>;

    }

    if (!session) {

        return <LoginForm />;

    }

    return children;

}

export default RequireAuth;
