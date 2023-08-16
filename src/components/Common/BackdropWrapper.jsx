function BackdropWrapper({ children, handleClick }) {
    return (
        <div onClick={handleClick} className="fixed h-screen inset-0 z-[99] flex">
            {children}
        </div>
    );
}

export default BackdropWrapper;