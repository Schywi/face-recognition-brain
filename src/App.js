import React ,{Component} from 'react';
import SignIn from './components/SignIn/SignIn.js';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';




import './App.css';


const app = new Clarifai.App({
  apiKey: '49b36f11c54d403292b70b7c20826333'
 });

const particlesOptions = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 200
        }
      } ,
  },  
} 
  

     
    


class App extends Component {
  constructor() {
    super();
    this.state = { 
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
    }
  }

  // To calculate face location
  calculateFaceLocation =(data) => { 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return { 
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * width)

    }
  }

displayFaceBox = (box) => { 
  this.setState({box:box})
  console.log(box)
}


  // To take the input value
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

// To submit when click  to the button
onButtonSubmit = (event) => {
  this.setState({imageUrl: this.state.input})


  // https://i.pinimg.com/236x/cb/8a/cc/cb8accb4955dabd87a4bfc8a6435773c.jpg
  app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
.then(generalModel => {
  return generalModel.predict(this.state.input);
})
.then(response => {
  this.displayFaceBox( this.calculateFaceLocation(response));
}).catch((err) => { console.log(err)})
  
}

onRouteChange = (route) => {

  if( route === 'signOut'){
    this.setState({isSignedIn: false})
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }


  this.setState({route: route});
}

  render() {

    const { isSignedIn,imageUrl,route,box } = this.state;

    return (
      <div className="App">
         <Particles className="particle canvas" params={particlesOptions} />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {
          route === 'home' 
          ? 
          <> 
          <Logo/>
          <Rank/>
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>

          <FaceRecognition  box={box} imageUrl={imageUrl } />
          </>
          :(
            this.state.route ==='signIn'?   
            <SignIn onRouteChange={this.onRouteChange}/> 
            :  <Register onRouteChange={this.onRouteChange}/> 
            )
         
}  
      </div>
  
  );
}
}

export default App;
