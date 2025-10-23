import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Heart, Target, Users } from "lucide-react";
import { memo } from "react";

export const Route = createFileRoute("/about")({
  component: About,
});

const StatCard = memo(
  ({
    icon: Icon,
    title,
    value,
    description,
  }: {
    icon: any;
    title: string;
    value: string;
    description: string;
  }) => (
    <Card className="bg-background shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6 text-center">
        <Icon className="mx-auto mb-4 text-teal-700" size={48} />
        <h3 className="text-2xl font-bold text-foreground mb-2">{value}</h3>
        <h4 className="font-semibold text-foreground mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
);

const ServiceItem = memo(({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3 items-start p-3 bg-background rounded-lg shadow-sm">
    <CheckCircle className="bg-teal-700 text-white rounded-full p-1.5 h-8 w-8 flex-shrink-0 mt-1" />
    <span className="text-muted-foreground">{children}</span>
  </li>
));

const ObjectiveItem = memo(({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-2 items-center">
    <CheckCircle className="bg-teal-700 text-white rounded-full p-1.5 h-8 w-8 flex-shrink-0" />
    <span className="text-muted-foreground">{children}</span>
  </li>
));

const members = [
  {
    name: "Prof. Ismaila A Mungadi",
    rank: "Chairman",
    des: "",
    image: "/chairman.png",
  },
  {
    name: "Bashir Adamu Gusau",
    rank: "Secretary",
    des: "Acting Perm sec Min of Health",
    image: "/sec.png",
  },
  {
    name: "Dr. Usman Muhammad Shanawa",
    rank: "Member",
    des: "ASYB Specialist Hospital Gusau",
    image: "/usman.jpg",
  },
  {
    name: "Dr. Musa Muhammad Birnin Tsaba",
    rank: "Member",
    des: "MD, King Fahad Hospital, Gusau",
    image: "/tsaba.png",
  },
  {
    name: "Dr. Bello A. Mohammed",
    rank: "Member",
    des: "MD Federal Medical Centre, Gusau",
    image: "/bello.png",
  },
  {
    name: "Dr. Aminu Mohammed Nahuche",
    rank: "Member",
    des: "ASYB Specialist Hospital Gusau",
    image: "/aminu.png",
  },
  {
    name: "Sci. Mustafa Marafa",
    rank: "Member",
    des: "Health Services Management Board",
    image: "/marafa.png",
  },
  {
    name: "Prof. Lawal S Bilbis",
    rank: "Patron",
    des: "Vice Chancellor Usmanu Danfodiyo University",
    image: "/vc.jpg",
  },
];

const team_members = [
  { fullName: "Prof. Ahmad Yakubu", des: "Surgeon" },
  { fullName: "Dr. Sa’ad Idris", des: "Surgeon" },
  { fullName: "Dr. Hassan Wara", des: "Surgeon" },
  { fullName: "Dr. Musa Moh’d", des: "Surgeon" },
  { fullName: "Nura Abubakar", des: "Circulating Nurse" },
  { fullName: "Nabila Sulaiman", des: "Circulating Nurse" },
  { fullName: "Sadiya Sani", des: "Preoperative Nurse" },
  { fullName: "Dr. Ibrahim Jibrila", des: "Anaesthesiologist" },
  { fullName: "Dr. Tsalha B/tsaba", des: "Anaesthetist" },
  { fullName: "Nr. Zara’u Umar", des: "Circulating Nurse" },
  { fullName: "Nr. Balkisu Isah Ahmad", des: "Nurse Anaesthetist" },
  { fullName: "Amina Ibrahim", des: "Preoperative Nurse" },
  { fullName: "Nr. Nura Adamu", des: "Preoperative Nurse" },
  { fullName: "Nr. Basiru Abubakar", des: "Preoperative Nurse" },
  { fullName: "Umar Ibrahim", des: "Preoperative Nurse" },
  { fullName: "Nr. Ibrahim Salisu", des: "Nurse Anaesthetist" },
  { fullName: "Nr. Bushira I. Sayyadi", des: "Circulating Nurse" },
  { fullName: "Nasir Muhammad", des: "W/Servant" },
  { fullName: "Mannir Garba Kurmi", des: "W/Servant" },
  { fullName: "Moh’d Garba", des: "W/Servant" },
  { fullName: "Mubarak Almustapha", des: "W/Servant" },
  { fullName: "Haliru Usman", des: "Attendant" },
  { fullName: "Murtala Attahiru", des: "Attendant" },
  { fullName: "Nasiru Bello", des: "Attendant" },
  { fullName: "Samira Kabiru", des: "Attendant" },
  { fullName: "Fatima Idris", des: "Attendant" },
  { fullName: "Aisha Aliyu Umar", des: "Attendant" },
  { fullName: "Aisha Yahaya", des: "Attendant" },
  { fullName: "Khadija Ismail", des: "Attendant" },
  { fullName: "Margret Farida Ishak", des: "Attendant" },
  { fullName: "Fatima Yahaya", des: "Attendant" },
  { fullName: "Na'ama'u Almustapha", des: "Attendant" },
  { fullName: "Hauwa'u Abubakar", des: "Attendant" },
  { fullName: "Maryam Mila'il", des: "Attendant" },
  { fullName: "Zulai Janyau Aliyu", des: "Attendant" },
  { fullName: "Shehu Mande", des: "Laundry" },
  { fullName: "Aminu Abubakar", des: "In-charge" },
  { fullName: "Yusuf Ladan", des: "W/Servant" },
];

const resource_staff_eye = [
  { fullName: "Dr. Adamu Dantanin", des: "Ophthalmologist" },
  { fullName: "Dr. Ibrahim Halilu", des: "Ophthalmologist" },
  { fullName: "Dr. Kansushi Moh’d Ibrahim", des: "Ophthalmologist" },
  { fullName: "Dr. Mustapha Hafiz", des: "Ophthalmologist" },
  { fullName: "Dr. Bello Moh’d Mafara", des: "Ophthalmologist" },
  { fullName: "Dr. Abdulkarim Tuba", des: "Ophthalmologist" },
  { fullName: "Lawali Hassan Shemori", des: "Ophthalmic Nurse" },
  { fullName: "Bashiru Yusuf", des: "Ophthalmic Nurse" },
  { fullName: "Abdulrahaman Ahmad", des: "Ophthalmic Nurse" },
  { fullName: "Salisu Muh’d Dan Alhaji", des: "Ophthalmic Nurse" },
  { fullName: "Muktar Umar Faruk", des: "Ophthalmic Nurse" },
  { fullName: "Zulaihat Larai Musa", des: "Ophthalmic Nurse" },
  { fullName: "Sama’ila Bello", des: "Ophthalmic Nurse" },
  { fullName: "Yusuf Dogara", des: "Ophthalmic Nurse" },
  { fullName: "Ishaka Mahadi", des: "Theatre Attendant" },
  { fullName: "Ibrahim Bawa", des: "Theatre Attendant" },
  { fullName: "Hassan Abubakar", des: "Theatre Attendant" },
  { fullName: "Abdullaziz Ibrahim", des: "Theatre Attendant" },
  { fullName: "Idris Mai Aiki", des: "Clinic Attendant" },
  { fullName: "Zainab Abubakar", des: "Clinic Attendant" },
  { fullName: "Sama’ila Adamu", des: "Clinic Attendant" },
  { fullName: "Nura Sani Kaura", des: "Data Analyst" },
  { fullName: "Zainu Ibrahim", des: "Biometry Lab Technician" },
  { fullName: "Murtala Ibrahim", des: "Medical Record" },
  { fullName: "Aliyu Abubakar Samrawi", des: "Medical Record" },
  { fullName: "Safiya Aliyu", des: "Pharmacy Technician" },
];

const groin = [
  { fullName: "Prof. Ismail A Mungadi", des: "Surgeon" },
  { fullName: "Dr Peter Enesi", des: "Surgeon" },
  { fullName: "Dr Olusegun G Obadele", des: "Surgeon" },
  { fullName: "Dr Abubakar Sadik", des: "Surgeon" },
  { fullName: "Dr Haruna Kamba", des: "Surgeon" },
  { fullName: "Dr Aminu Aliyu", des: "Surgeon" },
  { fullName: "Dr Salisu Ya'u", des: "Surgeon" },
  { fullName: "Dr Bilya Isah", des: "Surgeon" },
  { fullName: "Dr Ahmad Muhammad Umar", des: "Surgeon" },
  { fullName: "Dr Aminu Ibrahim", des: "Surgeon" },
  { fullName: "Dr Keny Okeke", des: "Surgeon" },
  { fullName: "Dr Sanusi Namadi", des: "Surgeon" },
  { fullName: "Dr Titus Enymaya", des: "Surgeon" },
  { fullName: "Dr Gambo Liman", des: "Surgeon" },
  { fullName: "Dr Musa Muhammad B/Tsaba", des: "Surgeon" },
  { fullName: "Dr Karim Quadri", des: "Surgeon" },
  { fullName: "Dr Marcus Solomon", des: "Surgeon" },
  { fullName: "Dr Ibrahim Adekambi", des: "Surgeon" },
  { fullName: "Dr Okpechi Micheal", des: "Surgeon" },
  { fullName: "Dr Patrick Okoli", des: "Surgeon" },
  { fullName: "Dr Abdulhakeem", des: "Surgeon" },
  { fullName: "Dr Ahmed Muhammad Gusau", des: "Surgeon" },
  { fullName: "Dr Abdullahi Khalid", des: "Surgeon" },
  { fullName: "Dr Ogeh chibueze", des: "Surgeon" },
  { fullName: "Dr Hakeem Oyeleke", des: "Surgeon" },
  { fullName: "Dr Jibrila Ibrahim", des: "Anaesthesiologist" },
  { fullName: "Dr Salisu Usman", des: "Anaesthetist" },
  { fullName: "Dr Tsalha Moriki", des: "Anaesthetist" },
  { fullName: "Nr Ibrahim Salisu", des: "Nurse Anaesthetist" },
  { fullName: "Nr Zaharaddeen Abubakar", des: "Nurse Anaesthetist" },
  { fullName: "Nr Nasiru Dahiru Kurami", des: "Nurse Anaesthetist" },
  { fullName: "Nr Aminu Almustapha", des: "Nurse Anaesthetist" },
  { fullName: "Nr Tijjani Kasimu", des: "Nurse Anaesthetist" },
  { fullName: "Joshua Egyeari", des: "Nurse Anaesthetist" },
  { fullName: "Nr Bushar Ibrahim Sayyadi", des: "Nurse Anaesthetist" },
  { fullName: "Nr Zara'u Umar", des: "Nurse Anaesthetist" },
  { fullName: "Dr Isah M. Moriki", des: "Anaesthetist" },
  { fullName: "Nr Kabiru Salisu Zamau", des: "Anaesthetist" },
  { fullName: "Nr Kabiru Alhassani", des: "Anaesthetist" },
  { fullName: "Nr Bala Moh’d", des: "Anaesthetist" },
  { fullName: "Nr Abdulsamad Yusuf", des: "Anaesthetist" },
  { fullName: "Nr Nura Isah", des: "Anaesthetist" },
  { fullName: "Nr Abubakar Sadiq", des: "Anaesthetist" },
  { fullName: "Nr Ekpa Momoh", des: "Anaesthetist" },
  { fullName: "Nr Lawal Muhammad Bello", des: "Anaesthetist Technician" },
  { fullName: "Nr Aminu Abdullahi Wanzamai", des: "Perioperative Nurse" },
  { fullName: "Nr Ibarim Umar", des: "Perioperative Nurse" },
  { fullName: "Nr Sanusi Ibrahim", des: "Perioperative Nurse" },
  { fullName: "Nr Sulaiman Ibrahim", des: "Perioperative Nurse" },
  { fullName: "Nr Lawal Hassan k/kosh", des: "Perioperative Nurse" },
  { fullName: "Nr Aishatu Bashar Rini", des: "Perioperative Nurse" },
  { fullName: "Nr Nafi'u Yahaya", des: "Perioperative Nurse" },
  { fullName: "Nr Nabila Sulaiman", des: "Perioperative Nurse" },
  { fullName: "Nr Aliyu Hussaini", des: "Perioperative Nurse" },
  { fullName: "Nr Bashir Abdulrahman", des: "Perioperative Nurse" },
  { fullName: "Nr Abubakar Muhammad Yusuf", des: "Perioperative Nurse" },
  { fullName: "Nr Adamu Garba", des: "Perioperative Nurse" },
  { fullName: "Nr Lawal Muhammad", des: "Perioperative Nurse" },
  { fullName: "Nr Ibrahim Muhammad", des: "Perioperative Nurse" },
  { fullName: "Nr Nuruddeen Ibarahim", des: "Perioperative Nurse" },
  { fullName: "Nr Ibrahim Sani", des: "Perioperative Nurse" },
  { fullName: "Nr Dalhatu Bello", des: "Perioperative Nurse" },
  { fullName: "Nr Umar Ibrahim", des: "Perioperative Nurse" },
  { fullName: "Nr Basher Abdulrahman", des: "Perioperative Nurse" },
  { fullName: "Nr Aminu Abubakar", des: "Perioperative Nurse" },
  { fullName: "Nr Farida Isah", des: "Perioperative Nurse" },
  { fullName: "Nr Shuaib Muhammad Gado", des: "Perioperative Nurse" },
  { fullName: "Nr Shafi'u Maisallah", des: "Perioperative Nurse" },
  { fullName: "Nr Shafi'u Lawali", des: "Perioperative Nurse" },
  { fullName: "Nr Yusuf Yusuf Moriki", des: "Perioperative Nurse" },
  { fullName: "Nr Abdulhamid Ibrahim", des: "Perioperative Nurse" },
  { fullName: "Nr Ibrahim Musa", des: "Perioperative Nurse" },
  { fullName: "Nr Sadiya Atiku Abubakar", des: "Perioperative Nurse" },
  { fullName: "Nr Abubakar Lawali", des: "Perioperative Nurse" },
  { fullName: "Nr Mus'ab Ahmad", des: "Circulating Nurse" },
  { fullName: "Nr Umar Aliyu", des: "Circulating Nurse" },
  { fullName: "Nr Dalhatu Lawali", des: "Circulating Nurse" },
  { fullName: "Nr Yazid Garba", des: "Circulating Nurse" },
  { fullName: "Nr Kamalu Isah", des: "Circulating Nurse" },
  { fullName: "Nr Nura Adamu", des: "Circulating Nurse" },
  { fullName: "Nr Luba Rabi'u Malam", des: "Circulating Nurse" },
  { fullName: "Nr Fatima Halilu Anka", des: "Circulating Nurse" },
  { fullName: "Hamida Surajo", des: "Circulating Nurse" },
  { fullName: "Mu'azu Galadima", des: "Circulating Nurse" },
  { fullName: "Nr Balkisu Isah Ahmad", des: "Circulating Nurse" },
  { fullName: "Nr Abubakar Muhammad Yusuf", des: "Circulating Nurse" },
  { fullName: "Nr Nura Yusuf Tambari", des: "Circulating Nurse" },
  { fullName: "Nr Abdulrazak Ilyasu", des: "Circulating Nurse" },
  { fullName: "Nr Bashiru Abubakar", des: "Circulating Nurse" },
  { fullName: "Sanusi Hamid", des: "Medical Lab" },
  { fullName: "Mannir Garba Dan Kurmi", des: "Attendant" },
  { fullName: "Nasiru Muhammad", des: "Attendant" },
  { fullName: "Haliru Usman", des: "Attendant" },
  { fullName: "Muhammad Garba", des: "Attendant" },
  { fullName: "Yusuf Ladan", des: "Attendant" },
  { fullName: "Bala Bashir", des: "Attendant" },
  { fullName: "Ahmad B Umar", des: "Attendant" },
  { fullName: "Mubarak Almustapha", des: "Attendant" },
  { fullName: "Yunusa Salihu", des: "Attendant" },
  { fullName: "Shehu Mani", des: "Attendant" },
  { fullName: "Basiru Ilyasu", des: "Attendant" },
  { fullName: "Abdullahi Makwashe", des: "Attendant" },
  { fullName: "Murtala Attahiru", des: "Attendant" },
  { fullName: "Ahmad Mu'azu Mailayi", des: "Attendant" },
  { fullName: "Abdullahi Sani", des: "Attendant" },
  { fullName: "Muhammad Ahmad", des: "Attendant" },
  { fullName: "Ibrahim Sani", des: "Attendant" },
  { fullName: "Ashiru Mu'azu", des: "Attendant" },
  { fullName: "Sadisu Salihu", des: "Attendant" },
  { fullName: "Hadiza Kabiru", des: "Attendant" },
  { fullName: "Bello Mustapha", des: "Attendant" },
  { fullName: "Sama'la Bello", des: "Attendant" },
  { fullName: "Aliyu Musa", des: "Attendant" },
  { fullName: "Bello Muhammad", des: "Attendant" },
  { fullName: "Nasiru Abdullahi", des: "Attendant" },
  { fullName: "Kasimu Aliyu", des: "Attendant" },
  { fullName: "Safiyanu Sani", des: "Attendant" },
  { fullName: "Bashir Ahmad", des: "Attendant" },
  { fullName: "Musa Yahaya", des: "Attendant" },
  { fullName: "Bashir Muhammad", des: "Attendant" },
  { fullName: "Abdulrazak Tukur", des: "Attendant" },
  { fullName: "Nasiru Bello", des: "Operator" },
  { fullName: "Nasiru Sahabi", des: "Data Analyst" },
  { fullName: "Abdulrashid Bashir", des: "Secretarial Assistant" },
  { fullName: "Aminu Abubakar", des: "DDNS" },
  { fullName: "Musa Sa'idu", des: "Pharmacy" },
  { fullName: "Ibrahim Sani", des: "Record" },
];

function About() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background to-blue-50">
      <div className="py-24 px-4 max-w-7xl mx-auto">
        {/* Hero Section */}
        <Card className="relative bg-linear-to-r from-teal-700 to-emerald-700 text-white rounded-2xl overflow-hidden mb-16">
          <div className="relative z-10 p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Our Mission
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Transforming healthcare accessibility in Zamfara State through
              comprehensive medical outreach programs that prioritize citizen
              welfare and quality of life.
            </p>
          </div>
        </Card>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <StatCard
            icon={Target}
            title="Target Cases"
            value="7,000"
            description="Total medical cases targeted in the first year"
          />
          <StatCard
            icon={Users}
            title="Communities Served"
            value="50+"
            description="Rural and urban communities reached"
          />
          <StatCard
            icon={Heart}
            title="Lives Improved"
            value="5,000+"
            description="Patients successfully treated to date"
          />
        </div>

        {/* Background Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-background shadow-lg border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-teal-700 text-2xl md:text-3xl">
                Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground text-lg leading-relaxed space-y-4">
                <p>
                  Established under the visionary leadership of His Excellency,
                  Dr. Dauda Lawal, Executive Governor of Zamfara State, this
                  special medical outreach committee was inaugurated on July
                  6th, 2023, by the Secretary to the State Government, Mal.
                  Abubakar M. Nakwada.
                </p>
                <p>
                  The program receives special support from Her Excellency
                  Hajiya Huriyya Dauda-Lawal for Vesico-Vaginal Fistula repairs,
                  demonstrating the state's commitment to comprehensive
                  healthcare solutions.
                </p>
                <p>
                  Treatment centres include Yariman Bakura Specialist Hospital,
                  Federal Medical Centre Gusau, General Hospital Gusau, Farida
                  VVF Centre Gusau, and Eye Centre Gusau. Consumables and drugs
                  were procured from Drug and Medical Consumable Management
                  Agency (DMA), Gusau.
                </p>
                <p>
                  A comprehensive proposal with detailed workable plan was
                  formally submitted to the Executive Governor on August 2nd,
                  2023 in the presence of His Excellency Malam Mani Mummuni, the
                  Deputy Governor of Zamfara State.
                </p>
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-teal-50 to-blue-50 shadow-lg border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-teal-700 text-2xl md:text-3xl">
                Our Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <ServiceItem>
                  <strong>Cataract Extraction:</strong> 3,500 cases - Advanced
                  eye surgery to restore vision clarity
                </ServiceItem>
                <ServiceItem>
                  <strong>Groin Swellings:</strong> 2,800 cases - Treatment for
                  hernias, hydroceles, and related conditions
                </ServiceItem>
                <ServiceItem>
                  <strong>VVF Repairs:</strong> 700 cases - Specialized surgical
                  procedures to restore normal function
                </ServiceItem>
                <ServiceItem>
                  <strong>Health Education:</strong> Community-wide awareness
                  programs promoting preventive healthcare
                </ServiceItem>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Objectives Section */}
        <Card className="bg-background shadow-lg border-0 rounded-2xl mb-16">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl bg-linear-to-r from-teal-700 to-indigo-600 text-transparent bg-clip-text text-center">
              Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-4 max-w-2xl mx-auto">
              <ObjectiveItem>Cataract extraction: 3,500 cases</ObjectiveItem>
              <ObjectiveItem>
                Groin swellings (hernias, hydroceles, others): 2,800 cases
              </ObjectiveItem>
              <ObjectiveItem>
                Vesico-Vaginal Fistula repairs (VVF and others): 700 cases
              </ObjectiveItem>
              <ObjectiveItem>Health Education</ObjectiveItem>
            </ul>
          </CardContent>
        </Card>

        {/* Methodology Section */}
        <Card className="relative bg-muted rounded-2xl overflow-hidden mb-16">
          <div className="relative z-10 p-8">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl bg-linear-to-r from-teal-700 to-indigo-600 text-transparent bg-clip-text text-center">
                Methodology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  Following approval of the proposal and release of two-month
                  worth of budgeted amount, the outreach started in earnest in
                  accordance with the work plan. Advocacy visits were made to
                  the Emir of Gusau and many traditional community leaders.
                  Radio jingles were played to inform Zamfara communities about
                  this outreach.
                </p>
                <p>
                  Zoom video meetings were held with resource persons and
                  medical officers in the designated hospitals. All were advised
                  on screening and safety measures necessary to ensure
                  successful and hitch-free outreach. Procurement of drugs and
                  consumables not available at DMA was made. Other drugs were
                  obtained from DMA. Production of stickers, banners, screening
                  tools, and evaluation tools was completed.
                </p>
                <p>
                  Resource staff were mobilized and enrolled from across the
                  state with additional surgeons recruited from Sokoto, Kaduna,
                  and Abuja. More than 125 medical staff were engaged for the
                  program. The outreach team comprised surgeons, gynaecologists,
                  ophthalmologists, anaesthesiologists, nurses, medical
                  laboratory scientists, pharmacists, health record officers,
                  and other allied health workers.
                </p>
                <p>
                  Training and standardization of hernia surgery were conducted.
                  The training consisted of lectures and practical
                  demonstrations to standardize hernia surgery to prevent
                  recurrence. This training was led by Professor Ismaila
                  Mungadi, Dr. Peter Enesi, and Dr. Abubakar S Muhammad.
                </p>
                <p>
                  In addition to the targeted cases of cataract, groin
                  swellings, and vesico-vaginal fistula, patients with surgical
                  conditions that could be accommodated were not denied surgery.
                  These included lipomas, ganglion, pelvic organ prolapse,
                  intersex, undescended testes, anorectal anomalies, and
                  injuries.
                </p>
              </CardDescription>
            </CardContent>
          </div>
        </Card>

        {/* Impact Section */}
        <Card className="relative bg-muted rounded-2xl overflow-hidden mb-16">
          <div className="relative z-10 p-8">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl bg-linear-to-r from-teal-700 to-indigo-600 text-transparent bg-clip-text text-center">
                Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  The impact of the outreach on the local community was
                  tremendous. The free program has improved the quality of life
                  of many citizens of Zamfara State and potentially the economic
                  situation of their families. Many beneficiaries had been
                  carrying their pathologies for several years and were unable
                  to get operated on due to lack of resources.
                </p>
                <p>
                  The outreach provided free surgeries and postoperative
                  medications. There were 495 eyesight restorations, 607 cures
                  from debilitating groin swellings, and remedies for 57 women
                  devastated by agonizing VVF. This has saved many families'
                  income that would have been used to seek treatment.
                </p>
                <p>
                  The outreach improved the skills of local surgeons. Many
                  trainee gynaecologists and ophthalmologists benefited from the
                  experience. Treatment centres were upgraded with surgical
                  equipment and materials that will continue to benefit the
                  centres post-outreach.
                </p>
                <p>
                  The outreach also improved the turnover of the Drug and
                  Medical Consumable Management Agency (DMA), as it was the
                  primary source of drugs and consumables. The need for diverse
                  drugs allowed DMA to connect with quality-assured sources
                  nationwide, boosting its growth.
                </p>
                <p>
                  Authorities at FMC Gusau noted reduced patient traffic,
                  allowing the centre to focus on specialized tertiary care and
                  reducing work overload.
                </p>
              </CardDescription>
            </CardContent>
          </div>
        </Card>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-background shadow-lg border-0 rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-xl md:text-2xl text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide accessible, high-quality medical care to all citizens
                of Zamfara State, focusing on preventable conditions and
                improving overall community health outcomes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background shadow-lg border-0 rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-white" size={32} />
              </div>
              <h2 className="text-xl md:text-2xl text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A healthier Zamfara State where every citizen has access to
                quality healthcare services, regardless of their economic status
                or geographical location.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Section */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl bg-linear-to-r from-teal-700 text-transparent bg-clip-text to-indigo-600 text-center my-14">
            Our Team
          </h1>
          <div className="grid md:grid-cols-4 gap-6 my-10 p-4">
            {members.map((m, i) => (
              <Card
                key={i}
                className="bg-muted/30 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden"
              >
                <img
                  src={m.image}
                  className="w-full h-64 object-cover"
                  alt={`Portrait of ${m.name}, ${m.rank}`}
                  loading="lazy"
                />
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-foreground">
                    {m.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{m.des}</p>
                  <Badge
                    variant="outline"
                    className="border-teal-700 text-teal-700"
                  >
                    {m.rank}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="my-10">
            <div>
              <h2 className="text-xl md:text-2xl my-4">
                Resource Staff for VVF Operation
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SN</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Designation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team_members.map((t, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{t.fullName}</TableCell>
                      <TableCell>{t.des}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl my-4">
                Resource Staff for Eye Operations
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SN</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Designation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resource_staff_eye.map((t, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{t.fullName}</TableCell>
                      <TableCell>{t.des}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl my-4">
                Resource Staff for Groin Operations
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SN</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Designation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groin.map((t, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{t.fullName}</TableCell>
                      <TableCell>{t.des}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
