import Image from "next/image";

export default function About() {
    return (
        <div className="w-[80vw] mx-auto flex flex-col items-center space-y-4">
            <h1>We are Indiana AID</h1>
            <Image src="/images/indiana-aid-logo.png" alt="Indiana AID Logo" width={200} height={200} />
            <p>Indiana AID was formed in 2019 when three individuals - a lawyer, a pastor, and a grad student - came together out of their mutual concern over the fact that there was no program in Indiana to support the immigrants who were detained by Immigration and Customs Enforcement (ICE) in our state. We began communicating with ICE about our interest in visiting the facility in early 2020, but our plans were canceled when the COVID-19 pandemic arrived and all in-person visitation was shut down. For the next two years, we slowed down our operations until a friend from the Interfaith Coalition of Detained Immigrants (ICDI) showed us how we could run a virtual visitation program at the jail, which did not require an in-person visit or even ICE permission. We set up such a virtual program at the end of 2021 and have been visiting with and assisting immigrants in the jail ever since. </p>
        </div>
    );
}