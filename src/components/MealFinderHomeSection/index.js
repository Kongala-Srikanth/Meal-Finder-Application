import { Component } from "react";
import "./index.css";

class MealFinderHomeSection extends Component {
  state = { foodData: [], searchText:'', searchData: undefined };

  componentDidMount() {
    this.getFoodData();
  }

  getFoodData = async () => {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    const response = await fetch(url);
    //const data = await JSON.stringify(response);
    const data = await response.json();
    if (response.ok) {
      this.setState({ foodData: data.categories });
    }
  };

  onSearch = async () => {
    const {searchText} = this.state
    const url = searchText !== '' ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}` : "https://www.themealdb.com/api/json/v1/1/categories.php"
    const response = await fetch(url);
    
    const data = await response.json();
    console.log(data)
    if (response.ok) {
      this.setState({ searchData: data.meals });
    }
  }

  onEnterSearch = (event) => this.setState({searchText: event.target.value}, this.onSearch)

  render() {
    const { foodData, searchText, searchData } = this.state;
    console.log(searchData)
    return (
      <>
        <input type="search" placeholder="search" className="search-input" onChange={this.onEnterSearch}/>
        <div className="all-card-container">
            {

            }
        
          {searchData !== undefined ? searchData.map((each) => (
            <div key={each.idMeal} className="card">
              <img src={each.strMealThumb} className="img" />
              <p className='dish-name'>{each.strCategory}</p>
              <p>{each.strInstructions}</p>
            </div> 
          )) : foodData.map((each) => (
            <div key={each.idCategory} className="card">
              <img src={each.strCategoryThumb} className="img" />
              <p className='dish-name'>{each.strCategory}</p>
              <p>{each.strCategoryDescription}</p>
            </div> 
          ))}
        </div>
        <footer className="footer-container">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </footer>
      </>
    );
  }
}

export default MealFinderHomeSection;
