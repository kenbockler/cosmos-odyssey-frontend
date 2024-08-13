function Header() {
    return (
        <header className="App-header">
            <div className="svg-container">
                <svg viewBox="70 -20 600 100" className="curved-text">
                    <path id="text-curve" d="M0,100 Q280,20 620,80" fill="transparent" />
                    <text width="500">
                        <textPath href="#text-curve" startOffset="20%" style={{ fill: 'white', fontSize: '52px' }}>
                            COSMOS ODYSSEY
                        </textPath>
                    </text>
                </svg>
            </div>
        </header>
    );
}

export default Header;
