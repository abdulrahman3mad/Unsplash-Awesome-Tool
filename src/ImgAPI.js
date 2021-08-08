import React, {Component} from "react"

class ImgAPI extends Component{
    constructor(){
        super()
        this.state = {
            allImgsData: [],
            randomImg: "",
            publisher: "",
            category: "baby",
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleNextImg = this.handleNextImg.bind(this)
    }

    handleSearch(){
        fetch(`https://api.unsplash.com/search/photos?query=${this.state.category}&client_id=2iYbNqbYw4SQQdjEjW-IAdhuJIqp2qykME1RzvhmvOs`)
        .then(res => res.json())
        .then(res => this.setState(
            {allImgsData: res, randomImg: res.results[0].urls.small, publisher: res.results[0].user.username}))
    }

    handleNextImg(){
        const randomNumber = Math.floor(Math.random() * this.state.allImgsData.results.length)
        const randomImgUrl = this.state.allImgsData.results[randomNumber].urls.small
        const randomPublisher = this.state.allImgsData.results[randomNumber].user.username
        this.setState({randomImg: randomImgUrl, publisher: randomPublisher})
    }


    handleChange(event){
        this.setState({category: event.target.value})
    }

    componentDidMount(){
        this.handleSearch()
    }

    render(){
        return (
            <main>
                <div>
                    <img src={this.state.randomImg} />
                    <p>by <span>{this.state.publisher}</span></p>
                </div>
                <input type="text" value={this.state.category} onChange={this.handleChange}></input>
                <div>
                    <button onClick={this.handleSearch}>Find</button>
                    <button onClick={this.handleNextImg}>Next</button>
                </div>
            </main>
        )
    }
}

export default ImgAPI