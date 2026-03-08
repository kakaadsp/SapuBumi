export default function GlitchText({ text, className = '' }) {
    return (
        <div className="glitch-wrapper w-full">
            <h1
                className={`glitch-text ${className}`}
                data-text={text}
            >
                {text}
            </h1>
        </div>
    );
}
