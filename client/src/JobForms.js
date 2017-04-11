import React, {Component} from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";
import SearchPanel from "./SearchPanel";
import {sendTestRequest} from "./api";

class JobForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      results: []
    };
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    });
  };

   handleSubmit = (event) => {
    sendTestRequest(this.state.search).then(json => {
      console.log(json);

      // TODO process the server response
      
        const serverData = json;
        // [{
    //         "company": "APN Software",
    //         "date": "Sat, 08 Apr 2017 07:35:32 GMT",
    //         "description": "Title: Software Engineer   Location: Palo Alto, CA   Duration: 6-12 Months   <b>Python</b>....   Candidate must be proficient in the following  programing tools and languages: MS suite, <b>Python</b>, HTML, XML, parsing, BML, SFDC...",
    //         "locations": "Palo Alto, CA",
    //         "salary": "",
    //         "site": "www.recruitology.com",
    //         "title": "Software Engineer (Python)",
    //         "url": "http://jobviewtrack.com/en-us/job-181b414843030600421152611b0e08131241060d4916444c544348011d6c541b46171f001c0245451a0f001d4f4e4f0d5d1d1b06481a22060606070900450648190a5e4352432f170008530341110d411e1e11481b0668441f180e/a8a707e4078d6099d98e98f37d451d58.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Empower Consultancy Services Inc",
    //         "date": "Sat, 08 Apr 2017 07:57:25 GMT",
    //         "description": "ECSI-22174-Back-end developer with <b>Python</b> experience utilizing a sci-py library-contract-6months-sfo-ca-nk   San... Francisco, CA   Date : Mar-23-17   ECSI-22174-Back-end developer with <b>Python</b> experience utilizing a sci-py library-contract...",
    //         "locations": "San Francisco, CA",
    //         "salary": "",
    //         "site": "www.techfetch.com",
    //         "title": "ECSI-22174-Back-end developer with Python experience utilizing a sci-py library-contract-6months-sfo-ca-nk",
    //         "url": "http://jobviewtrack.com/en-us/job-4c49414144061d0f550d220109020547004e10480d165c4e51425d011d6c441b4e171a000d134544111e0c1f455b585f2f000a1842184f130d134e171c541c070771484a5e460d01010a2643165b5d/ff085f91adfbdac481e92e5e0df343f1.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Saxon Global Inc",
    //         "date": "Sat, 08 Apr 2017 07:04:52 GMT",
    //         "description": "Job: Looking for JAVA Developer with <b>Python</b> Scripting Experience Local to Palo Alto, CA   Palo Alto, CA...   Date : Today (Apr-07-17)   Job: Looking for JAVA Developer with <b>Python</b> Scripting Experience Local to Palo Alto, CA   Palo Alto, CA...",
    //         "locations": "Palo Alto, CA",
    //         "salary": "",
    //         "site": "www.techfetch.com",
    //         "title": "Looking for JAVA Developer with Python Scripting Experience Local to Palo Alto, CA",
    //         "url": "http://jobviewtrack.com/en-us/job-1912414948120a02480445116a0b0f1104221e091f120a4f585b4808001e4206220909170f4715590000061d284f585b4808001e42060013111506080b21435d5a40/b4335bcc1075d113dd07e35c0c3ce452.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "PDDN INC",
    //         "date": "Fri, 07 Apr 2017 07:46:07 GMT",
    //         "description": "IT/Software, Financial, Government, HealthCare, Retail, Dot Com, Insurance, Pharmaceuticals, Manufacturing, Telecom   Work Authorization  US Citizen  GC  EAD (OPT/CPT/GC/H4)  H1B...",
    //         "locations": "Sunnyvale, CA",
    //         "salary": "$110000 per year",
    //         "salary_currency_code": "USD",
    //         "salary_max": "110000",
    //         "salary_min": "110000",
    //         "salary_type": "Y",
    //         "site": "www.techfetch.com",
    //         "title": "Python/Java/Druid Technical Lead",
    //         "url": "http://jobviewtrack.com/en-us/job-184d41474c120e4e4b1141076a0b0f110422000d0a1b44425e4c4144030b4610220909170f4715590000061d28415c5b4c441b0b441c4e0a0b0002470945150c6844121a0c/8e7985472cd7c2e8716dcf9a02b5d219.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Enterprise Solution inc",
    //         "date": "Sat, 08 Apr 2017 07:44:45 GMT",
    //         "description": "<b>Python</b> with Golang  Ref No.: 17-17867   Location: San Jose, California  Role :- <b>Python</b> with Golang,Java  Location... :- San Jose, CA  Duration :- 12+ Months   Job Description:  Digital : <b>Python</b>, Digital : Ruby on Rails, Web Technologies...",
    //         "locations": "San Jose, CA",
    //         "salary": "",
    //         "site": "www.resume-library.com",
    //         "title": "Python with Golang",
    //         "url": "http://jobviewtrack.com/en-us/job-4e4a415d54100701497517555150/0ffe99b275b2e1b2a5bddb5b6beaec66.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "SAP",
    //         "date": "Sat, 08 Apr 2017 07:53:26 GMT",
    //         "description": " institutions. We\u2019re looking for a passionate <b>Python</b> expert to support the development of Conversational AI-based applications... and we are looking for a passionate leader & builder with a proven track record in applying <b>Python</b> to enterprise-scale problems.   Purpose   This position...",
    //         "locations": "Palo Alto, CA",
    //         "salary": "",
    //         "site": "jobs.sap.com",
    //         "title": "Senior Python Expert, Conversational AI Services Job",
    //         "url": "http://jobviewtrack.com/en-us/job-4f1d415e480a0601555453061a1707040053761810074244532f5e011d184e1745106a0416170052006a1a164442525f2c535a5d14/f40d97e83a8229a738320581f8271738.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Enervee",
    //         "date": "Sat, 01 Apr 2017 07:12:19 GMT",
    //         "description": " and big data analytics platform  Hands on experience in shell scripting and <b>Python</b>  Expert knowledge in UNIX and Networking...",
    //         "locations": "Venice, CA",
    //         "salary": "",
    //         "site": "www.resume-library.com",
    //         "title": "DevOps Engineer | AWS | Python | PostgreSQL",
    //         "url": "http://jobviewtrack.com/en-us/job-134e415d42171b095511531204631e1e11481b066b16444c544348011d6c4311560c18126c020b471d060c16580b4d54590c00002643185b5f/70b9094e042f4a49a338573d73adc045.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Resource Informatics Group",
    //         "date": "Thu, 30 Mar 2017 07:46:07 GMT",
    //         "description": " Dallas, TX area.   Please find below job details   Job Description:   Title: Automation QA Tester with <b>Python</b> scripting...: Automation QA Tester with <b>python</b> scripting, Selenium   ABOUT THE JOB:   - Build out infrastructure and contribute to architecture...",
    //         "locations": "California",
    //         "salary": "",
    //         "site": "www.resume-library.com",
    //         "title": "Automation QA Tester with Python",
    //         "url": "http://jobviewtrack.com/en-us/job-181c415948171b0b5554510248001b130a4d151c001c44294c4c0d150e6c561500170d121a02172204111d1b45451d4c581000034600490c06631f064541011c061e4b5f544243655c5917/d1f931e6fc1fd957fc413210416d2be0.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Methodica Technologies",
    //         "date": "Wed, 05 Apr 2017 07:43:38 GMT",
    //         "description": "  Automation System level  Understanding in SW development  Basic understanding in <b>Python</b>  Knowledge regarding <b>Python</b> s Robot...",
    //         "locations": "Santa Barbara, CA",
    //         "salary": "",
    //         "site": "www.postjobfree.com",
    //         "title": "Infotainment Test: SW Test Engineer (Python)",
    //         "url": "http://jobviewtrack.com/en-us/job-4f13415e5a440a00401d4e060d136c13005300480c1d4d42534848166d1e5e00480c06411a021654760d0714434558485f441f17531c4f0d6a1219471145071c4916444c544348011d6f10431157/a67b65d4c50cfaa9423534baf93770f9.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "",
    //         "date": "Thu, 05 Jan 2017 08:05:59 GMT",
    //         "description": " to fill their position for a Virtual Senior Ecommerce Payments Platform <b>Python</b> Developer.   Candidates will be responsible... for the following:  Writing work in <b>Python</b>/Flask, MySQL, nginx, elastic search, redis, etc  Working with a core team to design...",
    //         "locations": "California",
    //         "salary": "",
    //         "site": "www.virtualvocations.com",
    //         "title": "Telecommute Senior Ecommerce Payments Platform Python Developer near Santa Monica",
    //         "url": "http://jobviewtrack.com/en-us/job-4f4d41484e0b02034206430648050b11004c1b180c01285b5c544001011a54545306060801156744111e0c1f455b585f0d14161a4f1b4e611c040202064f19051c074f0b59485b010301571152611b04000e0a52540c0c054f47525d48166e5d1044/c895058562c7dd2082f8f4637b257e2a.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Robert Half Technology",
    //         "date": "Tue, 11 Apr 2017 07:59:52 GMT",
    //         "description": "Ref ID: 04810-9500461890   Classification: Software Engineer   Compensation: DOE   <b>Python</b> Developer Robert Half... Technology is seeking a <b>Python</b> Developer for our client located in the Westwood, CA area. The <b>Python</b> Developer...",
    //         "locations": "Westwood, CA",
    //         "salary": "",
    //         "site": "www.careerbuilder.com",
    //         "title": "Python Developer",
    //         "url": "http://jobviewtrack.com/en-us/job-4c1e415d54100701497644061e0402081545066a0d165c4e51425d011d4e570d540b070f6f505c1243/847c8540fbfc994a9592686fab045a45.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Fortinet",
    //         "date": "Tue, 11 Apr 2017 06:02:16 GMT",
    //         "description": " California [CA]  Country United States [US]  Title Software Engineer-Cloud, <b>Python</b>/Java (AMRD683)  Req # AMRD683  Job Status Full...-on application development experience <b>Python</b>.  Good hands on experience with XML and Relational database (Oracle/MS SQL/MySQL...",
    //         "locations": "Sunnyvale, CA",
    //         "salary": "",
    //         "site": "www.fortinet.com",
    //         "title": "Software Engineer-Cloud, Python/Java (AMRD683)",
    //         "url": "http://jobviewtrack.com/en-us/job-1c1b415e42021b194606454302001806674a151e08534f455a4443010a1c25074f051c160f15000011060e1a444e585f0d0e0e184676530c0e1519061745540d0714434558485f661c01410057021a044e020b471d060c16580b4d54590c00002643185259/e330e0a27595b8d2f83ab31506d8fd0e.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "",
    //         "date": "Mon, 10 Apr 2017 22:54:41 GMT",
    //         "description": "Need <b>Python</b> Developers who have worked with Java technologies . (Sorry don't have J D for this requirement...",
    //         "locations": "San Carlos, CA",
    //         "salary": "",
    //         "site": "www.stratitude.com",
    //         "title": "Python Developer - Master Card, San Carlos, CA -Satya (16-00346) - CA - San Carlos",
    //         "url": "http://jobviewtrack.com/en-us/job-4b1e414e4c160b6c570d540b070f6c0a0453000d1b714e4e4b48410b1f0b557644061e04020815450648190a5e4352432c53595617/96f233b36d5e6d2eeced028ca53681ab.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "",
    //         "date": "Mon, 10 Apr 2017 22:51:54 GMT",
    //         "description": " and queue based architecture leveraging best of breed technologies, such as <b>Python</b>/Django, Javascript, Celery, RabbitMQ... a Lead role and has expertise in <b>Python</b> and Django...",
    //         "locations": "San Francisco, CA",
    //         "salary": "",
    //         "site": "www.stratitude.com",
    //         "title": "Django Python Lead - San Francisco, CA - Happiest Minds/ Clear Case - Jay (17-00041) - CA - San Francisco",
    //         "url": "http://jobviewtrack.com/en-us/job-484a41494705010948764c0609056c171c541c0707715a524945420a4f0a4d154e0407630d061645755f5f4b1f/c480673671662d584d6bab7979bead0e.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "",
    //         "date": "Mon, 10 Apr 2017 22:19:26 GMT",
    //         "description": " or <b>Python</b>  Experience creating and running queries within at least one database environment (SOQL/SOSL, MySQL, Oracle...",
    //         "locations": "San Mateo, CA",
    //         "salary": "",
    //         "site": "www.stratitude.com",
    //         "title": "Salesforce Developer with Javascript or Python (16-00314) - CA - San Mateo",
    //         "url": "http://jobviewtrack.com/en-us/job-4b1e414948120a02480445116a120f0b005312071b104f0b59485b010301571152611b00020216461b1a0a16284f585b4808001e42060013111506080b221e091f1259484f445d104f0a4202450f07110b15641743585b/f5172c2d2ecc6848521d7bcb9c9cf7ce.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Techworkers",
    //         "date": "Mon, 10 Apr 2017 07:49:42 GMT",
    //         "description": "WEB DEVELOPER \u2013 html, <b>Python</b>, SQL, eCommerce Website Development   Part time / Remote OK, but SF Bay Area preferred...:  HTML, CSS, JavaScript, <b>Python</b>, PHP, Ruby, etc  - Expertise in SQL, SQL tuning, and ETL development   Preferred...",
    //         "locations": "San Ramon, CA",
    //         "salary": "",
    //         "site": "www.careerbuilder.com",
    //         "title": "WEB DEVELOPER \u2013 html, Python, SQL, eCommerce Website Development",
    //         "url": "http://jobviewtrack.com/en-us/job-494a415e5c084f0a4202450f07110b156757110a49174f5d584142140a1c251c540e044119020700100d1f1646444d485f66180b455444061e040208154d11061d715a524945420a4f19421621545f5157/44b04fdcbefa70949da8195ec4be417a.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Robert Half Technology",
    //         "date": "Mon, 10 Apr 2017 07:42:32 GMT",
    //         "description": " to You can also call me at 408-271-9063 Need programming experience in <b>Python</b>, Java, C++; some data analytics experience... programming experience in <b>Python</b>, Java, C++; some data analytics experience is a plus, and generally someone who fits the profile...",
    //         "locations": "San Jose, CA",
    //         "salary": "",
    //         "site": "www.careerbuilder.com",
    //         "title": "Junior to Mid level Java/Python programmer",
    //         "url": "http://jobviewtrack.com/en-us/job-4e4d41474c120e4e4a1d44430404180209221e1d071a45591d474c120e6c4d014e0a07134e17174f131a081e474e4f2f4705190f0704520c0f130f0a0845066a03064442525f0d0e0e184654501107061c06084d111a68441c120c/1815acab257430591c2080a4725ba08b.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Hired",
    //         "date": "Mon, 10 Apr 2017 07:19:03 GMT",
    //         "description": "Are you a <b>Python</b> Software Engineer specializing in web apps? Your primary focus will be the development of all server... with server side logicImplementation of security and data protectionIntegration of data storage solutionsSkillsExpert in <b>Python</b>...",
    //         "locations": "San Francisco, CA",
    //         "salary": "",
    //         "site": "www.snagajob.com",
    //         "title": "Python Software Engineer",
    //         "url": "http://jobviewtrack.com/en-us/job-4b4e414843030600421152611b0e08131241060d4916444c544348011d6c541b46171f001c0245451a0f001d4f4e4f0d5d1d1b06481a22060606070900450648190a5e4352432f170008530341110d411e1e11481b0668441c1308/3a5f3e71af62ba3c6ca04da29463cfb7.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Roche Molecular",
    //         "date": "Sun, 09 Apr 2017 22:52:51 GMT",
    //         "description": "<b>Python</b> Software Engineer, Sequencing Job Description:Genia Technologies is a nanopore based sequencing company... for diseases and the diagnosis of cancers and infectious diseases. Write data analysis programs utilizing <b>Python</b> Propose, develop...",
    //         "locations": "Santa Clara, CA",
    //         "salary": "",
    //         "site": "www.getmarineengineeringjobs.com",
    //         "title": "Python Software Engineer, Sequencing",
    //         "url": "http://jobviewtrack.com/en-us/job-191a414843030600421152611b0e08131241060d4916444c544348011d6c541b46171f001c0245451a0f001d4f4e4f0d5d1d1b06481a22060606070900450648190a5e4352432f170008530341110d411e1e11481b0668441d1a08/e11b99b14f069f042cb88912ee84ffe9.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     },
    //     {
    //         "company": "Featured Jobs",
    //         "date": "Sun, 09 Apr 2017 22:47:34 GMT",
    //         "description": " learning: OpenStack, Scala, Node.js , SQL, Go, <b>Python</b>, RabbitMQ, Redis, REST API's Recommended skills (not 100...",
    //         "locations": "United Kingdom - California",
    //         "salary": "",
    //         "site": "www.rengineeringjobs.com",
    //         "title": "Back End Developer - Scala, Nodejs, Python - World class OTA",
    //         "url": "http://jobviewtrack.com/en-us/job-1b19412c18506d5d1044/d211c70dd15ec0163320197407fd0b30.html?affid=C:/Users/Solomon/OneDrive/Academic/2016-2017_Spring/CAS_CS411/CS411A1Group3/server2/api_test.py"
    //     }
    // ];
      // Set state
      this.setState({
        results: serverData
      });


    });

    event.preventDefault();
  };

  render() {
    

    const columns = [
    {
      header: 'Company',
      accessor: 'company'
    },
    {
      header: 'Title',
      accessor: 'title'},
    {
      header: 'Location',
      accessor: 'locations'
    },
    {
      header: 'Salary',
      accessor: 'salary'
    }
    ];


    return (<div>
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
      {this.state.search}
      <ReactTable
      data={this.state.results}
      columns={columns}
    />
    </div>);
  }
}

export default JobForms;