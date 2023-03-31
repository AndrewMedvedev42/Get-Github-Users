import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"

export const UserProfile = () => {
    const [user, setUser] = useState({})
    const [repositories, setRepositories] = useState([])
    const [technologies, setTechnologies] = useState([])
    const username = useLocation().pathname.split('/')[1]
    useEffect(()=>{
        axios.all([
            `https://api.github.com/users/${username}`,
            `https://api.github.com/users/${username}/repos`].map((endpoint)=> axios.get(endpoint)))
            .then((res)=>{
                const topics = res[1].data.filter((item)=>item.topics.length).map((item)=>item.topics).flat() 
                const uniqueItems = [...new Set(topics)]

                setUser(res[0].data)
                setRepositories(
                    res[1].data
                        .sort((a,b)=>new Date(b.updated_at) - new Date(a.updated_at))
                        .slice(0, 4))
                setTechnologies(
                    //filters and sorts technologies by highest precentage
                    uniqueItems?.map(currTech => {
                        const numItems = topics.filter(item => item === currTech) 
                        return {
                            name:currTech,
                            scoreOfUsage:numItems.length * 100 / topics.length
                        }
                    }).sort(function(a, b) {
                        return b.scoreOfUsage - a.scoreOfUsage;
                    }).slice(0, 20)
                )
            })
            .catch((err)=>{console.log(err)})
    },[username])

    return (
        <section className="user_page">
            <h1>{user?.login}</h1>
            <h2>{user?.name}</h2>
            <p>Public repositories: {user?.public_repos}</p>
            <p>Joined Github:{user?.created_at}</p>
            <article className="listsSection">
                <ul>
                <h3>Top 20 most used technologies</h3>
                    {
                        technologies.length ? (
                            technologies?.map((item)=>{
                                return <li className="technologyItem">{item.name} {Math.round(item.scoreOfUsage)}%</li>
                            })
                        ) : (
                            <li className="technologyItem">_</li> 
                        )

                    }
                </ul>
                <ul>
                <h3>Recently active in</h3>
                    {
                        repositories.length ? (
                            repositories?.map((repo)=>{
                                return (
                                    <li>
                                        <a href={repo?.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                                    </li>
                                )
                            })
                        ) :(
                            <li className="technologyItem">_</li> 
                        )
                    }
                </ul>
            </article>
        </section>
    )
}