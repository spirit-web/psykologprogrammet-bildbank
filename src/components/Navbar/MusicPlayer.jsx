import { useRef, useState } from "react";

const TRACKS = {

    original: { label: "Original", src: "/audio/pavlovs-hundar-original.mp3" },

    remix: { label: "Remix", src: "/audio/pavlovs-hundar-remix.mp3" }

};

function MusicPlayer() {

    const audioRef = useRef(null);

    const [track, setTrack] = useState("original");

    const [playing, setPlaying] = useState(false);

    function toggleTrack() {

        const next = track === "original" ? "remix" : "original";

        const wasPlaying = playing;

        setTrack(next);

        requestAnimationFrame(() => {

            if (audioRef.current) {

                audioRef.current.load();

                if (wasPlaying) {

                    audioRef.current.play();

                }

            }

        });

    }

    function togglePlay() {

        if (!audioRef.current) return;

        if (playing) {

            audioRef.current.pause();

        } else {

            audioRef.current.play();

        }

    }

    return (

        <div className="music-player">

            <button

                onClick={togglePlay}

                className="music-play-button"

                title={playing ? "Pausa" : "Spela upp"}

            >

                {playing ? "⏸" : "▶️"}

            </button>

            <button

                onClick={toggleTrack}

                className="music-track-button"

                title="Byt version"

            >

                🎵 {TRACKS[track].label}

            </button>

            <audio

                ref={audioRef}

                src={TRACKS[track].src}

                onPlay={() => setPlaying(true)}

                onPause={() => setPlaying(false)}

                onEnded={() => setPlaying(false)}

            />

        </div>

    );

}

export default MusicPlayer;
