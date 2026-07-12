import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { experiences } from "../data/experience";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-base">
      <div className="no-print sticky top-0 z-10 bg-base/95 backdrop-blur border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
          ← Back to portfolio
        </Link>
        <div className="flex gap-3">
          <a
            href={profile.resumePdf}
            download
            className="text-sm border border-white/15 rounded-lg px-4 py-2 hover:bg-white/5 transition"
          >
            ⬇ Download PDF
          </a>
          <button
            onClick={() => window.print()}
            className="text-sm bg-amber-500 text-base font-semibold rounded-lg px-4 py-2 hover:bg-amber-400 transition"
          >
            🖨 Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto my-10 bg-white text-gray-900 rounded-xl shadow-2xl p-10 print:shadow-none print:rounded-none print:my-0">
        <h1 className="text-3xl font-bold">{profile.name.toUpperCase()}</h1>
        <p className="text-gray-600 mt-1">
          {profile.title} | Azure | AWS | Kubernetes | CI/CD | Platform Engineering
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600 mt-3">
          <span>✉ {profile.email}</span>
          <span>📞 {profile.phone}</span>
          <span>📍 {profile.location} | Open to {profile.openTo.join(", ")}</span>
          <span>LinkedIn: linkedin.com/in/rahuman-ali</span>
          <span>GitHub: github.com/rahmann008</span>
        </div>

        <hr className="my-5 border-gray-200" />

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-800">{profile.summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Core Technical Skills</h2>
          <div className="text-sm text-gray-800 space-y-1">
            <p><b>Cloud Platforms:</b> Microsoft Azure, AWS, AKS, EKS, EC2, IAM, VPC, ALB, Lambda, CloudFront, RDS, Azure DevOps, Key Vault</p>
            <p><b>Containers & Orchestration:</b> Docker, Kubernetes, Helm, Ingress Controllers, Gateway API, Service Mesh</p>
            <p><b>CI/CD & Build:</b> Azure DevOps, Jenkins, GitHub Actions, CodePipeline, Maven, ANT</p>
            <p><b>Infrastructure as Code:</b> Terraform, ARM Templates, CloudFormation</p>
            <p><b>Configuration Management:</b> Ansible, Chef, Puppet</p>
            <p><b>Observability & Security:</b> Prometheus, Grafana, Dynatrace, ELK, SAST, SonarQube, DevSecOps</p>
            <p><b>Scripting:</b> Bash, Python, Shell, Ruby</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Professional Experience</h2>
          <div className="space-y-5">
            {experiences.map((e) => (
              <div key={e.company} className="break-inside-avoid">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <p className="font-semibold text-gray-900">{e.role}</p>
                  <p className="text-xs text-gray-500">{e.duration}</p>
                </div>
                <p className="text-sm text-gray-600 italic">{e.company} — {e.location}</p>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-800 space-y-0.5">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Education</h2>
          <p className="text-sm text-gray-800">Master of Computer Applications (MCA) — B.S. Abdur Rahman University, 2013</p>
          <p className="text-sm text-gray-800">Bachelor of Computer Applications (BCA) — Syed Hameeda Arts and Science College, 2010</p>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 mt-4">Certifications</h2>
          <p className="text-sm text-gray-800">AWS SysOps Administrator</p>
        </section>
      </div>
    </div>
  );
}
