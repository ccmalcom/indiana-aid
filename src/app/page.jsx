import Hero from "./ui/Hero";
import Cards from "./ui/Cards";

export default function Home() {
  return (
    <div id='fullView' className="h-screen" >

      {/* <Nav /> */}
      <Hero />
      <Cards />
      <div className="flex justify-center align-center">

      <div id='at-a-glance' className="w-1/2">
        <h1>At A Glance...</h1>
        <p>Indiana AID (Assistance to Immigrants in Detention) is a volunteer group that supports individuals detained by ICE in Indiana by bearing witness to their experiences through visits, offering information, and providing resources to them and their families.</p>
        <br />
        <p>We have a group that travels to the Clay County jail once per month for spiritual care, as well as a virtual visitation program through which we offer to pair every immigrant who arrives there with a visitation partner. </p>
        <br />
        <p>We also facilitate connections between immigrants and various service providers in our region, provide commissary support so that the people can buy food and medicine, and offer general updates to the public about developments in immigration detention in our state.  </p>
        <br />

      </div>
      <div id='recent-updates' className="w-1/2">
        <ul>
          <li>
            <h1>Recent Updates</h1>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
}
