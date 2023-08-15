import SearchIcon from "./components/Common/Icons/SearchIcon";

function Header() {
    return (
        <div className="p-5 flex justify-between item-center">
            <h2 className="text-2xl text-white font-bold">My Notes</h2>
            <button className="text-white scale-125">
                <SearchIcon />
            </button>
        </div>
    );
}

export default Header;