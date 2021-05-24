
import React from 'react';
import axios from 'axios';
    const CardList = (props) => (
  
	<div>
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

class Card extends React.Component {
	render() {
  	const profile = this.props;
  	return (
    	<div className="github-profile">
    	  <img alt="nick"src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
    );
  }
}

class Form extends React.Component {
	state = { userName: '' };
	handleSubmit =  (event) => {
  	event.preventDefault();
    let userName=this.state.userName.trim();
    if(userName===""){
      alert("username required");
    }
    else { 
      //const resp = await axios.get(`https://api.github.com/users/${userName}`);
      console.log('resp data');
      axios.get(`https://api.github.com/users/${userName}`).then((resp) =>{
         console.log('Data',resp);
         this.props.onSubmit(resp.data);
         this.setState({ userName: '' });
      }).catch((error)=>{
          console.log('Error', error);
          alert("username not found try another username");
      });
    // 
    
    
    }
    
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  <input 
          type="text" 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username" 
          required 
        />
        <button>Add card</button>
    	</form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData],
    }));
  };
	render() {
  	return (
    	<div>
    	  <h1 className="header">The Git GitHub Cards Apps Demo</h1>
        <Form onSubmit={this.addNewProfile} /> 
        <CardList profiles={this.state.profiles} />
       
    	</div>
    );
  }	
}
  

  
export default App;
