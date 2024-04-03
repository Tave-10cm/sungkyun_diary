
import "./OotdItem.css";

const OotdItem = ({id, createdDate, img, content})=>{

    return (
        <div className="OotdItem">
                <div className="img_section">
                    <img src={img} />
                </div>
                <div className="created_date">
                    {new Date(createdDate).toLocaleDateString()}
                </div>

                <div className="content_section">{content}</div>

        </div>
    );
};

export default OotdItem;