const { useState, useEffect, useRef, useCallback } = React;
const { CSSTransition, TransitionGroup } = ReactTransitionGroup;

// --- UI Components ---

const ScreenHeader = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 60000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="screen-header">
            <div className="time">{time}</div>
            <div className="signal">
                <div className="signal-bar" style={{ height: '4px' }}></div>
                <div className="signal-bar" style={{ height: '8px' }}></div>
                <div className="signal-bar" style={{ height: '12px' }}></div>
                <div className="signal-bar" style={{ height: '16px' }}></div>
            </div>
            <div className="battery">
                <div className="battery-icon"><div className="battery-level"></div></div>
            </div>
        </div>
    );
};

const BootScreen = () => (
    <div id="boot-screen">
        <svg id="hands-svg" viewBox="0 0 200 100">
            <path id="hand-left" className="hand" fill="var(--text-accent)" d="M61.4,58.5c-4,0-7.2-3.2-7.2-7.2V32.8c0-4,3.2-7.2,7.2-7.2s7.2,3.2,7.2,7.2v18.4C68.6,55.3,65.4,58.5,61.4,58.5z M61.4,27.5c-3,0-5.4,2.4-5.4,5.4v18.4c0,3,2.4,5.4,5.4,5.4s5.4-2.4,5.4-5.4V32.8C66.8,29.9,64.4,27.5,61.4,27.5z" />
            <path id="hand-right" className="hand" fill="var(--text-accent)" d="M138.6,58.5c4,0,7.2-3.2,7.2-7.2V32.8c0-4-3.2-7.2-7.2-7.2s-7.2,3.2-7.2,7.2v18.4C131.4,55.3,134.6,58.5,138.6,58.5z M138.6,27.5c3,0,5.4,2.4,5.4,5.4v18.4c0,3-2.4,5.4-5.4,5.4s-5.4-2.4-5.4-5.4V32.8C133.2,29.9,135.6,27.5,138.6,27.5z" />
        </svg>
        <div id="boot-text">Connecting People</div>
    </div>
);

const HomeScreen = () => (
    <>
        <ScreenHeader />
        <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-xl font-bold">{portfolioData.name}</div>
            <div className="mt-4">Press 'Menu'</div>
        </div>
    </>
);

const MenuScreen = ({ selectedIndex }) => {
    const selectedRef = useRef(null);
    useEffect(() => {
        selectedRef.current?.scrollIntoView({ block: 'nearest' });
    }, [selectedIndex]);
    return (
        <>
            <ScreenHeader />
            <div className="content-title">Menu</div>
            <div>
                {menuItems.map((item, index) => (
                    <div key={item} ref={index === selectedIndex ? selectedRef : null} className={`menu-item ${index === selectedIndex ? 'selected' : ''}`}>{item}</div>
                ))}
            </div>
        </>
    );
};

const ContentScreen = ({ section }) => {
    const renderContent = () => {
        switch (section) {
            case 'About': return <p>{portfolioData.objective}</p>;
            case 'Education': return portfolioData.education.map(edu => <div key={edu.institution} className="list-item"><div className="list-title">{edu.institution}</div><div className="list-subtitle">{edu.degree} | {edu.period}</div><div className="list-desc">{edu.details}</div></div>);
            case 'Experience': return portfolioData.experience.map(exp => <div key={exp.company} className="list-item"><div className="list-title">{exp.role}</div><div className="list-subtitle">{exp.company} | {exp.period}</div><ul className="list-disc pl-4 list-desc">{exp.points.map(p => <li key={p}>{p}</li>)}</ul></div>);
            case 'Projects': return portfolioData.projects.map(proj => <div key={proj.name} className="list-item"><div className="list-title">{proj.name}</div><div className="list-subtitle">{proj.tech.join(', ')}</div><div className="list-desc">{proj.desc}</div></div>);
            case 'Skills': return <><div className="list-item"><div className="list-title">Proficient In</div><div className="list-desc">{portfolioData.skills.proficient.join(', ')}</div></div><div className="list-item"><div className="list-title">Working Knowledge</div><div className="list-desc">{portfolioData.skills.knowledge.join(', ')}</div></div></>;
            case 'Certificates': return portfolioData.certificates.map(cert => <div key={cert} className="list-item list-desc">{cert}</div>);
            case 'Contact': return <>
                <div className="list-item list-desc">Email: {portfolioData.contact.email}</div>
                <div className="list-item list-desc">Phone: {portfolioData.contact.phone}</div>
                <div className="list-item list-desc link" onClick={() => window.open(portfolioData.contact.linkedin, '_blank')}>LinkedIn</div>
                <div className="list-item list-desc link" onClick={() => window.open(portfolioData.contact.github, '_blank')}>GitHub</div>
            </>;
            default: return null;
        }
    };
    return (
        <>
            <ScreenHeader />
            <div className="content-title">{section}</div>
            <div className="content-section">{renderContent()}</div>
        </>
    );
};

const SnakeGame = React.forwardRef(({ onGameOver }, ref) => {
    const canvasRef = useRef(null);
    const gameLoopRef = useRef(null);
    const directionRef = useRef('right');
    const changingDirectionRef = useRef(false);

    const changeDirection = useCallback((newDirection) => {
        if (changingDirectionRef.current) return;
        changingDirectionRef.current = true;
        const goingUp = directionRef.current === 'up', goingDown = directionRef.current === 'down', goingRight = directionRef.current === 'right', goingLeft = directionRef.current === 'left';
        if (newDirection === 'up' && !goingDown) directionRef.current = 'up';
        if (newDirection === 'down' && !goingUp) directionRef.current = 'down';
        if (newDirection === 'left' && !goingRight) directionRef.current = 'left';
        if (newDirection === 'right' && !goingLeft) directionRef.current = 'right';
    }, []);

    React.useImperativeHandle(ref, () => ({ changeDirection }));

    useEffect(() => {
        const canvas = canvasRef.current, ctx = canvas.getContext('2d'), gridSize = 10;
        let snake, food, score;

        const createFood = () => {
            food = { x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize };
            if (snake.some(part => part.x === food.x && part.y === food.y)) createFood();
        };

        const start = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            snake = [{ x: Math.floor(canvas.width / 2 / gridSize) * gridSize, y: Math.floor(canvas.height / 2 / gridSize) * gridSize }];
            score = 0;
            directionRef.current = 'right';
            createFood();
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
            gameLoopRef.current = setInterval(main, 100);
        };

        const draw = () => {
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--screen-bg');
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 0.5;
            for (let x = 0; x <= canvas.width; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }
            ctx.fillStyle = '#00ff00';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            snake.forEach(part => {
                ctx.fillRect(part.x, part.y, gridSize, gridSize);
                ctx.strokeRect(part.x, part.y, gridSize, gridSize);
            });
            ctx.fillStyle = '#ff00ff';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.fillRect(food.x, food.y, gridSize, gridSize);
            ctx.strokeRect(food.x, food.y, gridSize, gridSize);
            ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--screen-border');
            ctx.lineWidth = 4;
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-accent');
            ctx.font = '12px "Press Start 2P"';
            ctx.fillText(`Score: ${score}`, 10, 20);
        };

        const main = () => {
            const head = { ...snake[0] };
            switch (directionRef.current) {
                case 'right': head.x += gridSize; break;
                case 'left': head.x -= gridSize; break;
                case 'up': head.y -= gridSize; break;
                case 'down': head.y += gridSize; break;
            }
            const didGameEnd = () => {
                if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
                for (let i = 1; i < snake.length; i++) { if (head.x === snake[i].x && head.y === snake[i].y) return true; }
                return false;
            };
            if (didGameEnd()) {
                clearInterval(gameLoopRef.current);
                onGameOver(score);
                return;
            }
            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) { score++; createFood(); } else { snake.pop(); }
            changingDirectionRef.current = false;
            draw();
        };
        start();
        return () => clearInterval(gameLoopRef.current);
    }, [onGameOver]);
    return <canvas ref={canvasRef} id="game-canvas"></canvas>;
});

const GameOverScreen = ({ score }) => (
    <div className="w-full h-full flex flex-col justify-center items-center text-center">
        <div className="text-lg">Game Over</div>
        <div className="text-md mt-2">Score: {score}</div>
        <div className="mt-4 text-xs">Press OK to Restart</div>
    </div>
);

// --- Main App Component ---
function App() {
    const [view, setView] = useState('boot');
    const [animationDirection, setAnimationDirection] = useState('right');
    const [menuIndex, setMenuIndex] = useState(0);
    const [contentSection, setContentSection] = useState('');
    const [finalScore, setFinalScore] = useState(0);
    const snakeGameRef = useRef(null);

    const handleArrowKeys = useCallback((direction) => {
        if (view === 'menu') {
            setMenuIndex(prev => (direction === 'up' ? prev - 1 + menuItems.length : prev + 1) % menuItems.length);
        }
    }, [view]);

    const handleSelect = useCallback(() => {
        setAnimationDirection('right');
        if (view === 'menu') {
            const section = menuItems[menuIndex];
            if (section === 'Snake Game') setView('snake');
            else { setContentSection(section); setView('content'); }
        } else if (view === 'gameover') setView('snake');
    }, [view, menuIndex]);

    const handleBack = useCallback(() => {
        setAnimationDirection('left');
        if (['content', 'snake', 'gameover'].includes(view)) setView('menu');
        else if (view === 'menu') setView('home');
    }, [view]);

    const handleMenu = useCallback(() => {
        if (view !== 'menu') {
            setAnimationDirection(view === 'home' ? 'right' : 'left');
            setMenuIndex(0);
            setView('menu');
        }
    }, [view]);

    const handleNumKey = useCallback((key) => {
        if (view === 'snake') {
            const directionMap = { '2': 'up', '8': 'down', '4': 'left', '6': 'right' };
            if (directionMap[key]) snakeGameRef.current?.changeDirection(directionMap[key]);
        }
    }, [view]);

    const handleGameOver = useCallback((score) => { setFinalScore(score); setView('gameover'); }, []);

    useEffect(() => {
        if (view === 'boot') {
            const transitionTimer = setTimeout(() => setView('home'), 3000);
            const playBootSound = async () => {
                try {
                    await Tone.start();
                    const synth = new Tone.Synth().toDestination();
                    const now = Tone.now();
                    synth.triggerAttackRelease("E5", "8n", now);
                    synth.triggerAttackRelease("D5", "8n", now + 0.2);
                    synth.triggerAttackRelease("A4", "4n", now + 0.4);
                    synth.triggerAttackRelease("B4", "4n", now + 0.8);
                    synth.triggerAttackRelease("C#5", "8n", now + 1.2);
                    synth.triggerAttackRelease("B4", "8n", now + 1.4);
                    synth.triggerAttackRelease("A4", "2n", now + 1.6);
                } catch (e) { console.error("Audio playback failed.", e); }
            };
            playBootSound();
            return () => clearTimeout(transitionTimer);
        }
    }, [view]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const keyMap = {
                ' ': handleMenu, 'Enter': handleSelect, 'Escape': handleBack,
                'ArrowUp': () => view === 'snake' ? snakeGameRef.current?.changeDirection('up') : handleArrowKeys('up'),
                'ArrowDown': () => view === 'snake' ? snakeGameRef.current?.changeDirection('down') : handleArrowKeys('down'),
                'ArrowLeft': () => view === 'snake' ? snakeGameRef.current?.changeDirection('left') : null,
                'ArrowRight': () => view === 'snake' ? snakeGameRef.current?.changeDirection('right') : null,
            };
            if (keyMap[e.key]) { e.preventDefault(); keyMap[e.key](); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [view, handleMenu, handleSelect, handleBack, handleArrowKeys]);

    const renderScreenContent = () => {
        switch (view) {
            case 'boot': return <BootScreen />;
            case 'home': return <HomeScreen />;
            case 'menu': return <MenuScreen selectedIndex={menuIndex} />;
            case 'content': return <ContentScreen section={contentSection} />;
            case 'snake': return <SnakeGame ref={snakeGameRef} onGameOver={handleGameOver} />;
            case 'gameover': return <GameOverScreen score={finalScore} />;
            default: return null;
        }
    };

    return (
        <div className="phone-container">
            <div className="screen-border">
                <div className="screen">
                    <TransitionGroup>
                        <CSSTransition
                            key={view}
                            timeout={300}
                            classNames={animationDirection}
                        >
                            <div className="page-container">
                                {renderScreenContent()}
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
            <div className="keypad">
                <div className="side-keys"><button onClick={handleMenu} className="key nav-key">Menu</button></div>
                <div className="center-nav-cluster">
                    <button onClick={() => handleArrowKeys('up')} className="key nav-key arrow-key">▲</button>
                    <button onClick={handleSelect} className="key nav-key select-key">OK</button>
                    <button onClick={() => handleArrowKeys('down')} className="key nav-key arrow-key">▼</button>
                </div>
                <div className="side-keys"><button onClick={handleBack} className="key nav-key">Back</button></div>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(key => (
                    <button key={key} onClick={() => handleNumKey(key)} className="key">{key}</button>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
