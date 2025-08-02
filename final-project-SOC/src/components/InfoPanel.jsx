import React, { useState, useEffect } from 'react';


const CommentsSection = () => {

    const [comments, setComments] = useState(() => {
        const savedComments = localStorage.getItem('solar-system-comments');
        if (savedComments) {
            return JSON.parse(savedComments);
        } else {

            return [
                { id: 1, text: "This is an amazing portfolio!" },
                { id: 2, text: "Love the 3D solar system." },
                { id: 3, text: "Great work on the animations." },
            ];
        }
    });


    const [newComment, setNewComment] = useState("");


    useEffect(() => {
        localStorage.setItem('solar-system-comments', JSON.stringify(comments));
    }, [comments]);


    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === "") return;


        setComments([...comments, { id: Date.now(), text: newComment }]);
        setNewComment("");
    };


    const handleDeleteComment = (commentId) => {

        const updatedComments = comments.filter(comment => comment.id !== commentId);

        setComments(updatedComments);
    };

    return (
        <>

            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="comment-item">
                            <span>{comment.text}</span>
                            <button
                                onClick={() => handleDeleteComment(comment.id)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#ff4d4d',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    float: 'right',
                                    padding: '0 5px'
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#888' }}>No comments yet. Be the first!</p>
                )}
            </div>


            <form onSubmit={handleCommentSubmit}>
                <textarea
                    placeholder="Say something..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};


const ImageCarousel = () => {
    const images = Array.from({ length: 12 }, (_, i) => `/images/image${i + 1}.jpg`);

    const [currentIndex, setCurrentIndex] = useState(0);
    const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    const goToPrevious = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button className="carousel-arrow" onClick={goToPrevious}>&#10094;</button>
            <img src={images[currentIndex]} alt={`Gallery image ${currentIndex + 1}`} style={{ maxWidth: '100%', maxHeight: '350px', borderRadius: '8px', objectFit: 'contain', boxShadow: "4px 4px 10px rgba(1, 1, 1, 0.7)" }} />
            <button className="carousel-arrow" onClick={goToNext}>&#10095;</button>
        </div>
    );
};


const panelContent = {
    earth: {
        title: 'About Me', content: (<><img src="images/me.jpg" alt="My Profile" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.5)" }} /><h3>Dhairyansh</h3><p><h3>Welcome to my corner of the universe! I'm a developer passionate about creating immersive web experiences.</h3>
            <h4> My First Year at IIT Bombay: A Journey of Growth, Grit, and the Game </h4>

            Walking into IIT Bombay was like stepping into a world I’d dreamed of — but nothing quite prepared me for the reality. The first year was a rollercoaster of academics, self-discovery, and life beyond the classroom. From figuring out how to survive lectures and labs to exploring hostel life, fests, and long walks around campus, every day added a new layer to my experience.

            One of the biggest constants that kept me grounded was basketball. Whether it was evening practice sessions on the courts or intense inter-hostel matches under the floodlights, the sport gave me a space to breathe, reset, and push myself — both physically and mentally. It wasn’t just about the game; it was about the friendships, the hustle, and the quiet satisfaction of improving little by little.

            Between solving problem sets, learning to manage time, and figuring out who I am outside the textbooks, this first year shaped me more than I expected. IITB isn’t just about academics — it’s a place that challenges you in every possible way, and helps you grow in the process. And for me, it’s only the beginning.</p></>)
    },
    venus: { title: 'Gallery', content: <ImageCarousel /> },
    jupiter: {
        title: 'TimeLine', content: (<ul style={{ textAlign: 'left', paddingLeft: '20px', margin: 0 }}><li>🎉 Joined IIT Bombay - July 2023</li>
            <li>📖 First semester - Aug 2023</li>
            <li>🏆 Won first prize in a coding competition - Oct 2023</li>
            <li>🎸 Attended a rock concert</li>
            <li>📖 Endsems Conquered - Nov 2024 </li>
            <li>🐘 Visited Elephanta caves with friends</li>
            <li>❄️ Winter vacation</li>
            <li>🎓 Second semester - Jan 2025</li>
            <li>🪩 Attended Mood Indigo (last day)</li>
            <li>🎉 Celebrated Holi (the best one yet)</li>
            <li>📖 Endsems Conquered - April 2025 (again)</li>
            <li>🥳 Celebrated my birthday - April 2025</li>
            <li>💻 Completed the 3-D portfolio project - July-end 2025</li>
        </ul>)
    },
    mars: {
        title: 'Learnings & Growth',
        content: (
            <ul style={{ textAlign: 'left', paddingLeft: '20px', margin: 0 }}>
                <li>🧠 Skills: Python, Web Dev, C++</li>
                <li>🏀 Sports: Basketball</li>
                <li>💪 Gym</li>
                <li>🏆 Projects: RC-car, Drone controller</li>
                <li>📖 Additional learning: Consulting case frameworks</li>
            </ul>
        )
    },
    saturn: {
        title: 'Contact', content: <p>Find me on <a href="https://www.instagram.com/dhairyanshpaliwal" target="_blank" rel="noopener noreferrer">
          Instagram,
        </a>
        <a href="https://www.linkedin.com/in/dhairyanshpaliwal" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
          LinkedIn, 
        </a>
        <p style={{ marginLeft: '10px' }}> or Email me at paliwaldhairyansh@gmail.com</p>
        </p>
    },

    uranus: { title: 'Comments', content: <CommentsSection /> }
};


export default function InfoPanel({ activePlanet, setActivePlanet }) {
    if (!activePlanet) return null;
    const { title, content } = panelContent[activePlanet] || {};
    if (!title) return null;
    const isGallery = activePlanet === 'venus';
    const panelClassName = `info-panel ${isGallery ? 'info-panel-large' : ''}`;
    return (
        <div className="info-panel-overlay" onClick={() => setActivePlanet(null)}>
            <div className={panelClassName} onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={() => setActivePlanet(null)}>×</button>
                <h3>{title}</h3>
                <div className="info-panel-content">
                    {content}
                </div>
            </div>
        </div>
    );
}
