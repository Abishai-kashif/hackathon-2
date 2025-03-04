interface IProps {
    name: string;
    email: string;
    userSubject?: string;
    message: string;
}

export const EmailTemplate: React.FC<Readonly<IProps>> = ({
    name,
    email,
    userSubject,
    message,
}) => (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
        <h1 style={{ color: "#333" }}>New Message from {name}</h1>

        {userSubject && (
            <p>
                <strong>Subject:</strong> {userSubject}
            </p>
        )}

        <p>
            <strong>From:</strong> {email}
        </p>

        <div
            style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#f5f5f5",
            }}
        >
            <h3 style={{ marginTop: "0" }}>Message:</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
        </div>
    </div>
);
