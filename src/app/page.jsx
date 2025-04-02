import Hero from "./ui/Hero";
import Card from "./ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function Home() {

  const currentIssue = 'Current Issue: September 2023';

  return (
    <div id='fullView' className="h-screen w-[90vw] md:w-[80vw] m-auto" >

      <Hero />

      <div className='flex align-center justify-center '>
        <div id='newsletter-card' className={`w-1/3 h-1/3 bg-blue m-4 p-4 text-white text-center`}>
          <div className="card-header">
            <h1 className='text-2xl'>Monthly Newsletter</h1>
          </div>
          <div className="card-buttons flex flex-col items-center justify-center mb-4">
            <button className="bg-yellow hover:bg-yellow-dark text-white font-bold py-2 px-4 my-4  rounded ">Read Latest Release</button>
            <a href="/resources/newsletter" className="hover:text-yellow">Subscribe</a>
          </div>
        </div>
        <div id='connect-card' className={`w-1/3 h-1/3 bg-blue m-4 p-4 text-white text-center`}>
          <div className="card-header">
            <h1 className='text-2xl'>Connect with Us</h1>
          </div>
          <div className="card-buttons flex flex-col items-center justify-center">
              <button className="bg-yellow hover:bg-yellow-dark text-white font-bold py-2 px-4 my-4 mx-2  rounded ">Join Mailing List</button>
            <div className="social-links flex flex-row mb-4">
              <a href="https://www.instagram.com/indianaaid/" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-yellow">
              <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.facebook.com/indianaAID1" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-yellow">
              <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          </div>
        </div>
        <div id='knowledge-card' className={`w-1/3 h-1/3 bg-blue m-4 p-4 text-white text-center`}>
          <h1 className='text-2xl'>Stay in the Know</h1>
          <div className="flex flex-col items-center justify-center">

            <a href="https://www.immigrationadvocates.org/legaldirectory/" target="_blank" rel="noopener noreferrer"><button className="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 mt-4 mx-2 rounded ">Find Help</button></a>
            <button className="bg-yellow hover:bg-yellow-dark text-white font-bold py-2 px-4 mt-4 mx-2  rounded ">Know Your Rights</button>
          </div>
        </div>
            
      </div>

      <div className="grid grid-cols-2 gap-4">
          <Card title='At A Glance' width='1/2' height='1/2'
        text='Indiana AID (Assistance to Immigrants in Detention) is a volunteer group that supports individuals detained by ICE in Indiana by bearing witness to their experiences through visits, offering information, and providing resources to them and their families.
        
        We have a group that travels to the Clay County jail once per month for spiritual care, as well as a virtual visitation program through which we offer to pair every immigrant who arrives there with a visitation partner. 
        
        We also facilitate connections between immigrants and various service providers in our region, provide commissary support so that the people can buy food and medicine, and offer general updates to the public about developments in immigration detention in our state. '
          />
          <Card title='Recent Updates' width='1/2' height='1/2'/>
      </div>
    </div>
  );
}
