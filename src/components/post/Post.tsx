import "./Post.css";

interface PostProps {
    text: string;
    imageUrl: string;
    pageIds: string[];
    scheduledPublishTime: number;
}

export default function Post({
    text,
    imageUrl,
    pageIds,
    scheduledPublishTime,
}: PostProps) {
    return (
        <div>
            <h3>{text}</h3>
            <p>{new Date(scheduledPublishTime * 1000).toLocaleString()}</p>
            {imageUrl && <img src={imageUrl} />}
            {pageIds.map((id) => (
                <p>{id}</p>
            ))}
        </div>
    );
}
