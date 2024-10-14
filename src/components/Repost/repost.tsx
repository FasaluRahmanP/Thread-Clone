import { axiosInstance } from "@/Axios/axios";
import { useState } from "react";

interface RepostProps {
    isOpen: boolean;
    onClose: () => void;
    postId: string;
    userProfilePic: string;
    userId: string;
    username: string;
}
const Repost: React.FC<RepostProps> = ({ isOpen, onClose, postId, userProfilePic, userId, username }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const HandleRepost = async () => {
        setError(null);
        const repost = {
            userId: userId,
            userProfilePic: userProfilePic,
            username: username
        };


        try {
            console.log('this is a post id', postId);
            const response = await axiosInstance.post(`api/posts/repost/${postId}`, repost
            );
            postId = '';
            console.log("Reposted:", response.data);
            setLoading(false);
            onClose();
        } catch (err) {
            console.error("Failed to repost:", err);
            setError("Failed to repost. Please try again.");
            setLoading(false);
        }
    };

    if (!isOpen) return null



    return (
        <div className="repost-modaloverlay">
            <div className="repost-modalcontent">
                <button className="repost-closebutton" onClick={onClose}>&times;</button>
                {error && <p className="repost-errormessage">{error}</p>}
                <div className="repost-modalaction">
                    <button className="repost-cancelbutton" onClick={onClose} disabled={loading}>Cancel</button>
                    <button className="repost-repostbutton" onClick={HandleRepost} disabled={loading}>{loading ? "Reposting" : "Repost"}</button>
                </div>
            </div>
        </div>
    )
}
export default Repost