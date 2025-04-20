
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { HomePage } from './Pages/HomePage/Index';
import { AboutPage } from './Pages/AboutPage';
import { AffectedAreaPage } from './Pages/AffectedAreaPage';
import { AidPage } from './Pages/AidPage';
import { RehabulationCenter } from './Pages/RehabulationCenter';
import { Login } from './Pages/Login';
import { SignUp } from './Pages/SignUp';
import { AdminPage } from './Pages/Admin';
import { AskForAidPage } from './Pages/AskForAidPage';
import { ContactPage } from './Pages/ContactPage';
import { Massage } from './Pages/MassagePage';
import { DonationPage } from './Pages/DonationPage';
import { DonatePage } from './Pages/DonatePage';
import { SlidersList } from './Pages/sliders/list';
import { SLiderCreatePage } from './Pages/sliders/create';
import { SliderEditPage } from './Pages/sliders/edit';
import { AffectedAreas } from './Pages/Affectedareas/list';
import { AffectedAreaCreatePage } from './Pages/Affectedareas/create';
import { AboutList } from './Pages/Abouts/list';
import { AboutCreatePage } from './Pages/Abouts/create';
import { AboutEditPage } from './Pages/Abouts/edit';
import { GallariesList } from './Pages/Gallaries/list';
import { GallaryCreatePage } from './Pages/Gallaries/create';
import { GallaryEditPage } from './Pages/Gallaries/edit';
import { AffectedTypeList } from './Pages/AffectedTypes/list';
import { AffectedTypeCreatePage } from './Pages/AffectedTypes/create';
import { AffectedTypeEditPage } from './Pages/AffectedTypes/edit';
import { PostList } from './Pages/Posts/list';
import { PostCreatePage } from './Pages/Posts/create';
import { PostPage } from './Pages/PostPage';
import { ActivityList } from './Pages/Activites/list';
import { ActivityCreatePage } from './Pages/Activites/create';
import { ActivityEditPage } from './Pages/Activites/edit';
import { AllActivities } from './Pages/ActivityPage';
import { VolunteerSignUp } from './Pages/VolunteerSignUp';
import { CenterList } from './Pages/Centers/list';
import { CenterCreatePage } from './Pages/Centers/create';
import { CenterEditPage } from './Pages/Centers/edit';
import { TCenterList } from './Pages/TrainigCenters/list';
import { TCenterCreatePage } from './Pages/TrainigCenters/create';
import { TCenterEditPage } from './Pages/TrainigCenters/edit';
import { TrainingCenter } from './Pages/TrainingCenter';
import { TcenterView } from './Pages/TcenterView';import { ProductList } from './Pages/Products/list';
import { ProductCreatePage } from './Pages/Products/create';
import { ProductEditPage } from './Pages/Products/edit';
import { Products } from './Pages/ProductPage';
;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/affected-areas' element={<AffectedAreaPage />}/>
          <Route path='/aids' element={<AidPage />} />
          <Route path='/rehabulation-center' element={<RehabulationCenter />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/ask-for-aid/:id' element={<AskForAidPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/donations' element={<DonationPage />}/>
          <Route path='/donate/:id' element={<DonatePage />}/>
          <Route path='/posts' element={<PostPage />} />
          <Route path='/activities' element={<AllActivities />} />
          <Route path='/vsignup' element={<VolunteerSignUp />} />
          <Route path='/tcenters' element={<TrainingCenter />} />
          <Route path='/tcenter-view/:id' element={<TcenterView />} />
          <Route path='/products' element={<Products />} />



          <Route path='/be' element={<AdminPage />}/>
          <Route path='/be/sms' element={<Massage />}/>
         

          <Route path='/be/affectedareas' element={<AffectedAreas />}/>
          <Route path='/be/affectedarea-create' element={<AffectedAreaCreatePage />}/>

          <Route path='/be/sliders' element={<SlidersList />}/>
          <Route path='/be/slider-create' element={<SLiderCreatePage />}/>
          <Route path='/be/sliderEdit/:id' element={<SliderEditPage />}/>


          <Route path='/be/abouts' element={<AboutList />} />
          <Route path='/be/about-create' element={<AboutCreatePage />} />
          <Route path='/be/aboutEdit/:id' element={<AboutEditPage />} />

          <Route path='/be/gallaries' element={<GallariesList />} />
          <Route path='/be/gallaries-create' element={<GallaryCreatePage />} />
          <Route path='/be/gallaries-edit/:id' element={<GallaryEditPage />} />

          <Route path='/be/affectedtypes' element={<AffectedTypeList />} />
          <Route path='/be/affectedtypes-create' element={<AffectedTypeCreatePage />} />
          <Route path='/be/affectedtypes-edit/:id' element={<AffectedTypeEditPage />} />

          <Route path='/be/posts' element={<PostList />} />
          <Route path='/be/posts-create' element={<PostCreatePage />} />

          <Route path='/be/activities' element={<ActivityList />} />
          <Route path='/be/activities-create' element={<ActivityCreatePage />} />
          <Route path='/be/activities-edit/:id' element={<ActivityEditPage />} />

          <Route path='/be/centers' element={<CenterList />} />
          <Route path='/be/centers-create' element={<CenterCreatePage />} />
          <Route path='/be/centers-edit/:id' element={<CenterEditPage />} />

          <Route path='/be/tcenters' element={<TCenterList />} />
          <Route path='/be/tcenters-create' element={<TCenterCreatePage />} />
          <Route path='/be/tcenters-edit/:id' element={<TCenterEditPage />} />

          <Route path='/be/products' element={<ProductList />} />
          <Route path='/be/products-create' element={<ProductCreatePage />} />
          <Route path='/be/products-edit/:id' element={<ProductEditPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
