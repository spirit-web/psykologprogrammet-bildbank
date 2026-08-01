import "./SlideThumbnail.css";

function SlideThumbnail({ image, active, onClick }) {

    return (

        <div
            className={
                active
                    ? "thumbnail-card active"
                    : "thumbnail-card"
            }
            onClick={onClick}
        >

            <img
                className="thumbnail"
                src={image.image_url}
                alt={image.title}
            />

            <p className="thumbnail-caption">
                {image.title}
            </p>

        </div>

    );

}

export default SlideThumbnail;
