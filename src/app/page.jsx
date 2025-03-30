import Hero from "./ui/Hero";
import Card from "./ui/Card";

export default function Home() {
  return (
    <div id='fullView' className="h-screen w-[90vw] md:w-[80vw] m-auto" >

      <Hero />

      <div className='flex align-center justify-center '>
            <Card title='Monthly Newsletter' width='1/3' height='1/3'/>
            <Card title='Connect with Us' width='1/3' height='1/3'/>
            <Card title='Stay in the Know' width='1/3' height='1/3'/>
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
