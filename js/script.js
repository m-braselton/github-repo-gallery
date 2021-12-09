//targetting the div where your profile info will appear.
const overView = document.querySelector(".overview");
const username = "m-braselton";
const repoList = document.querySelector(".repo-list");
const classRepos = document.querySelector(".repos");
const individualRepo = document.querySelector(".repo-data");
const backToReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");



//create and name an async function to fetch info from github
const githubProfile = async function() {
  const showRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await showRequest.json();
    userInfo(data);
};
githubProfile();

//function to display the fetched user information
//create a div to contain user information
const userInfo = function(data) {
  const div = document.createElement("div");
  div.classList.add ("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
  overView.append(div);
  fetchRepos();

};
//async function to get list of users repos
const fetchRepos = async function() {
  const showRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
//repoData(individualRepo)
    const individualRepo = await showRepos.json();
    //console.log(repos);
//repoData(individualRepo)
    displayInfo(individualRepo);
};
//create function to display info from each repo.
const displayInfo = function(repos) {
  //give each (loop) repo a class of "repo" and an <h3> element with name of repo
  for(const repo of repos) {
     const repoItem = document.createElement("li");
     repoItem.classList.add("repo");
     repoItem.innerHTML = `<h3>${repo.name}</h3>`;
     repoList.append(repoItem);
  }
};
repoList.addEventListener("click", function(e) {
  if(e.target.matches("h3")) {
    const repoName = e.target.innerText;
  specificRepoInfo(repoName);
}
});

const specificRepoInfo = async function(repoName) {
  const specificRepository = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepository.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
      const languageData = await fetchLanguages.json();
      console.log(languageData);

//List the languages.
      const languages = [];
      for (const language in languageData){
        languages.push(language);
      }

      displayRepoInfo(repoInfo, languages);
}
const displayRepoInfo = function(repoInfo, languages) {
individualRepo.innerHTML = "";
individualRepo.classList.remove("hide");
classRepos.classList.add("hide");
const div = document.createElement("div");
div.innerHTML = `
<h3>Name: ${repoInfo.name} </h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    individualRepo.append(div);
  };

//  filterInput.addEventListener("input", function(e) {
//    const inputValue = e.target.value;
//    console.log(inputValue)
//  });
