import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Profile.scss';
import './EditProfile.scss';
import GetAvatar from './GetAvatar.js'

let apiUrl = "http://localhost:4000/api";

function EditProfile() {
    const {username} = useParams();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        console.log(username);
        axios.get(`${apiUrl}/users/${username}`).then(response => {
            setUser(response.data.data[0]);
            setAvatar(response.data.data[0].avatar)
        });
    }, [username]);
    const handleNameChange = event => {
        setName(event.target.value);
    };
    const handleBioChange = event => {
        setBio(event.target.value);
    };
    const handleSubmit = event => {
        let new_data = {};
        if (name)
            new_data.name = name;
        if (bio)
            new_data.bio = bio;
        if (avatar)
            new_data.avatar = avatar;
        axios.put(`${apiUrl}/users/${username}`, new_data).then(response => {
            console.log(response);
        });
        navigate(`/profile/${username}`, {replace: true});
    };
    const handleAvatarClick = event => {
        setAvatar(event.currentTarget.value);
    }
    return (
        <div className="profile-container">
            <div className="spacing"></div>
            <div className="user">
                <div className="user-snapshot">
                    <img className="profile-pic" src={GetAvatar[avatar]} alt="default gray avatar"/>
                    <br /><br /><br />
                    <div className="avatar-grid">
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Aladdin-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Aladdin-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Ariel-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Ariel-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Belle-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Belle-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Cinderella-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Cinderella-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Donald-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Donald-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Elsa-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Elsa-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Genie-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Genie-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Goofy-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Goofy-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Jasmine-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Jasmine-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Mickey-Mouse-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Mickey-Mouse-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Minnie-Mouse-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Minnie-Mouse-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Olaf-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Olaf-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Peter-Pan-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Peter-Pan-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Stitch-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Stitch-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Tinker-Bell-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Tinker-Bell-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                        <div className="grid-item">
                            <button onClick={handleAvatarClick} value="Winnie-the-Pooh-Disney-Plus-Icon.png">
                                <img src={user && GetAvatar["Winnie-the-Pooh-Disney-Plus-Icon.png"]} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="user-details">
                    <form onSubmit={handleSubmit}>
                        <label>Name: <input type="text" onChange={handleNameChange}/></label>
                        <br /><br />
                        <label>Biography: <input type="text" onChange={handleBioChange}/></label>
                        <br /><br />
                        <button type="submit" class="btn btn-primary">SAVE</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;