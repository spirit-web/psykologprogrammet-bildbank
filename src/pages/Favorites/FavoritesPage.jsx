import { useEffect, useState } from "react";

import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";

import useFavorites from "../../hooks/useFavorites";
import { supabase } from "../../services/supabase";

function FavoritesPage() {

    const { favoriteIds, toggleFavorite } = useFavorites();

    const [images, setImages] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            setLoading(true);

            if (favoriteIds.length === 0) {

                setImages([]);

                setLoading(false);

                return;

            }

            const { data, error } = await supabase

                .from("images")

                .select("*")

                .in("id", favoriteIds);

            if (error) {

                console.error(error);

                setImages([]);

            } else {

                setImages(data);

            }

            setLoading(false);

        }

        load();

    }, [favoriteIds]);

    return (

        <>
            <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

                <BackButton />

                <h1>⭐ Dina favoriter</h1>

                <p>Bilder du sparat för att snabbt hitta tillbaka till dem.</p>

                <ImageViewer

                    images={images}

                    loading={loading}

                    emptyMessage="Inga favoriter ännu — klicka ☆ Favorit på en bild för att spara den här."

                    onDeleted={imageId => {

                        setImages(current => current.filter(image => image.id !== imageId));

                        toggleFavorite(imageId);

                    }}

                />

            </div>

        </>

    );

}

export default FavoritesPage;
