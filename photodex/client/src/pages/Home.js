import React  from 'react';


const Home = () => {
    return (
      <div classNameName="home" >

        <div classNameName="container-flex m-4 d-flex justify-content-center">
            <div classNameName="row" id ="album">
              <div classNameName="column-fluid m-2">
                <div classNameName="row" id="about">
                  <div classNameName="col-3">
                  </div>
                  <div classNameName="col-9">
                  </div>
                </div>
    
                <h2>Welcome to PhotoDex!</h2>
                <p>
                  Organize your photo albums in the cloud.
                </p>
    
                <div classNameName="row">
    
                  <div classNameName="col-sm" style={{ width: 14 + 'rem' }}>
                    <div classNameName="card">
                      <img src="example_images/img006.png" classNameName="img-fluid" alt=''/>
                    </div>
                  </div>
                  
                  <div classNameName="col-sm" style={{ width: 14 + 'rem' }}>
                    <div classNameName="card">
                      <img src="example_images/img006.png" classNameName="img-fluid" alt=''/>
                    </div>
                  </div>
    
                  <div classNameName="col-sm" style={{ width: 14 + 'rem' }}>
                    <div classNameName="card">
                      <img src="example_images/img006.png" classNameName="img-fluid" alt=''/>
                    </div>
                  </div>
    
                  <div classNameName="w-100"></div>

                  <div classNameName="col-sm" style={{ width: 14 + 'rem' }}>
                    <div classNameName="card">
                      <img src="example_images/img001.png" classNameName="img-fluid" alt=''/>
                    </div>
                  </div>
    
                  <div classNameName="col-sm" style={{ width: 14 + 'rem' }}>
                    <div classNameName="card">
                      <img src="example_images/img002.png" classNameName="img-fluid" alt=''/>
                    </div>
                  </div>
    
                  <div classNameName="col-sm" style={{ width: 14 + 'rem' }}>
                    <div classNameName="card">
                      <img src="example_images/img006.png" classNameName="img-fluid" alt=''/>
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