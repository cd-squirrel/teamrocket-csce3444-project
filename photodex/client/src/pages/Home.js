import React  from 'react';


const Home = () => {
    return (
      <div className="home" >

        <div className="container-flex m-4 d-flex justify-content-center">
            <div className="row" id ="album">
              <div className="column-fluid m-2">
                <div className="row" id="about">
                  <div className="col-3">
                  </div>
                  <div className="col-9">
                  </div>
                </div>
    
                <h2>Welcome to PhotoDex</h2>
                <p>
                  Organize your photos in the cloud.
                </p>
    
                <div className="row">
    
                  <div className="col-sm" style={{ width: 14 + 'rem' }}>
                    <div className="card">
                      <img src="example_images/img006.png" className="img-fluid" alt=''/>
                    </div>
                  </div>
                  
                  <div className="col-sm" style={{ width: 14 + 'rem' }}>
                    <div className="card">
                      <img src="example_images/img006.png" className="img-fluid" alt=''/>
                    </div>
                  </div>
    
                  <div className="col-sm" style={{ width: 14 + 'rem' }}>
                    <div className="card">
                      <img src="example_images/img006.png" className="img-fluid" alt=''/>
                    </div>
                  </div>
    
                  <div className="w-100"></div>

                  <div className="col-sm" style={{ width: 14 + 'rem' }}>
                    <div className="card">
                      <img src="example_images/img001.png" className="img-fluid" alt=''/>
                    </div>
                  </div>
    
                  <div className="col-sm" style={{ width: 14 + 'rem' }}>
                    <div className="card">
                      <img src="example_images/img002.png" className="img-fluid" alt=''/>
                    </div>
                  </div>
    
                  <div className="col-sm" style={{ width: 14 + 'rem' }}>
                    <div className="card">
                      <img src="example_images/img006.png" className="img-fluid" alt=''/>
                    </div>
                  </div>
  
                  
                </div>
                </div>
            </div>
        </div>
    
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
      </div>
    );
};

export default Home;