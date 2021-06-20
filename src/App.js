import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import RepoDetails from "../src/Repo-details"

function App() {
const[username, setUserName] = useState("");
const[loading, setLoading] = useState(false);
const[repos, setRepos] = useState([]);
const[details, setDetails] = useState({});
const[detailsLoading, setDetailsLoading] = useState(false);


useEffect(() => {
  setRepos([]);
  setDetails({})
}, [username]);

function handleSubmit(e){
  e.preventDefault();
  searchRepos();
};

function searchRepos(){
  setLoading(true);
  axios({
    method: "get",
    url: `https://api.github.com/users/${username}/repos`,
  }).then(res => {
    setLoading(false);
    setRepos(res.data);
  });
}

function renderRepo(repo){
  return(
    <div className="row" onClick={() => getDetails(repo.name)} key={repo.id}>
      <h2 className="repo-name">
        {repo.name}
      </h2>
    </div>
  )
}
function getDetails(repoName){
  setDetailsLoading(true);
  axios({
    method: "get",
    url: `https://api.github.com/repos/${username}/${repoName}`,  
  }).then(res =>{
    setDetailsLoading(false);
    setDetails(res.data);
  });
}


  return (
    <div className="page">
      <div className="landing-page-container">
        <div className="left-side">
        <h1>Github Repository Finder</h1>
          <form className="form">
          <input 
            className="input"
            value={username}
            placeholder="Github Username"
            onChange={e => setUserName(e.target.value)}
          />
          <button className="button"
          onClick={handleSubmit}>{ loading ? "Serching..." : "Search" }</button>
          </form>
          <div className="results-container">
            {repos.map(renderRepo)}
          </div>
        </div>
        <RepoDetails details={details} loading={detailsLoading} />
      </div>
    </div>
  );
}

export default App;
