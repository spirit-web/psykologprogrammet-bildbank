import { useRef, useState } from "react";

const TRACKS = {

    original: { label: "Original", src: "/audio/pavlovs-hundar-original.mp3" },

    remix: { label: "Remix", src: "/audio/pavlovs-hundar-remix.mp3" },

    relax: { label: "Relax", src: "/audio/pavlovs-hundar-relax.mp3" }

};

const TRACK_ORDER = Object.keys(TRACKS);

function MusicPlayer() {

    const audioRef = useRef(null);

    const [track, setTrack] = useState("original");

    const [playing, setPlaying] = useState(false);

    function toggleTrack() {

        const next = TRACK_ORDER[(TRACK_ORDER.indexOf(track) + 1) % TRACK_ORDER.length];

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
