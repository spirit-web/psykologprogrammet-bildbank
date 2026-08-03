function SeahorseIcon({ size = 22, color = "#E8734A", style }) {

    return (

        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={{ verticalAlign: "middle", flexShrink: 0, ...style }}
        >

            <path
                d="M46 6
                   C 54 4 62 10 60 18
                   C 68 18 72 24 68 30
                   C 64 34 58 32 56 26
                   C 54 34 56 44 50 50
                   C 58 50 62 56 58 62
                   C 54 66 48 62 48 56
                   C 44 62 44 70 48 74
                   C 50 78 48 84 42 84
                   C 38 84 36 80 40 76
                   C 36 72 36 64 42 60
                   C 36 56 34 46 40 40
                   C 34 36 32 28 38 22
                   C 34 18 36 10 44 10
                   C 45 8 45 7 46 6 Z"
                fill="none"
                stroke={color}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <circle cx="52" cy="14" r="2" fill={color} />

        </svg>

    );

}

export default SeahorseIcon;
