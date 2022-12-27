import React,{useState} from 'react';
import axios from "axios"
import "./app.css";

function App() {
  const [userName, setUserName] = useState("");
  const [user,setUser] = useState([])
  const baseURL = "https://api.github.com/users/";
  const twitterUrl ="https://twitter.com/";
  const [repos, setRepos] = useState([]);
  const [submit, setSubmit] = useState(false);
    const TOKEN = "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"
  const handleSubmit = (e) => {
        e.preventDefault();
      const fetchData = async () => {
          const datas = await axios.get(`${baseURL}${userName}/access_token=${TOKEN}`)
          setUser(datas?.data)
      }
      fetchData()
      const fetchData2 = async () => {
          const repo = await axios.get(`${baseURL}${userName}/repos?sort=created?access_token=${TOKEN}`)
          setRepos(repo?.data)
      }
      fetchData2()
      setSubmit(true)
      setUserName("")
  }
  return (
    <div className="bg-c1 w-screen min-h-screen flex-col flex items-center justify-center">
      <form className="w-full text-center" onSubmit={(e) => handleSubmit(e)}>
          <input className="max-lg:w-4/5 focus:outline-none border-2 border-c3 w-2/5 px-4 text-c1 font-bold py-2 mb-5 placeholder:text-lg"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter github username."/>
      </form>
        {
            submit ?
            <>
                <div className="max-lg:w-4/5 max-sm:flex-col bg-c2 flex w-2/5 border py-4">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <img alt="" src={user?.avatar_url} className="w-56 h-56 rounded-full border-2 border-c1"/>
                        <span className="text-2xl text-center ">{user?.name} <br/><span className="text-md">{user?.bio}</span></span>
                    </div>
                    <div className="flex-1  flex flex-col items-center justify-around pr-12">
                        <div className="flex items-center gap-7 justify-between text-center ">
                            <span>{user?.public_repos} <br/> repo</span>
                            <span>{user?.followers} <br/> fallower</span>
                            <span>{user?.following}<br/> fallowed</span>
                        </div>
                        <div className=" p-6">
                            <div className="flex items-center justify-center gap-10 mb-6 ">
                                <a target="_blank" href={`${twitterUrl}${user?.twitter_username}`}><ion-icon name="logo-twitter"></ion-icon></a>
                                <a target="_blank" href={user?.html_url}><ion-icon name="logo-github"></ion-icon></a>
                            </div>
                            <div className="flex flex-col flex pb-6 h-full justify-around">
                                <span className="border-b border-c1"><ion-icon name="business-outline"></ion-icon>{user?.company}</span>
                                <span className="border-b border-c1"><ion-icon name="location-outline"></ion-icon>{user?.location && user.location}</span>
                                <span className="border-b border-c1"><ion-icon name="person-circle-outline"></ion-icon>{user?.login}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-lg:w-4/5 flex bg-c2 w-2/5   flex-wrap items-center border">
                    {
                        repos?.map((repo, i) =>(
                            <a target="_blank" className="bg-c3 cursor-pointer repo w-1/5  border-b border-r border-c2 hover:border-white hover:bg-c1 text-white  text-xs text-center px-1 py-1" href={repo?.html_url}>
                                <div className="" key={i}>{repo.name.substring(0,14)}</div>
                            </a>
                        ))
                    }
                </div>
            </> : <a href="https://github.com/enesdmc0"><h1 className="text-3xl font-bold text-c3 hover:text-c2 cursor-pointer repo">Enes Demirci</h1></a>
        }
    </div>
  )
}

export default App;
