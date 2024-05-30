import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";

export function Terms() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container max-w-screen-md grow py-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          FitFuel Website Terms of Use and Rules
        </h1>

        <p className="mt-6 leading-7">
          Welcome to FitFuel! Before you begin exploring our website, please
          read the following Terms of Use and Rules carefully. By accessing or
          using our website, you agree to be bound by these terms and rules. If
          you do not agree to these terms, please refrain from using our
          website.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight">
          1. Acceptance of Terms:
        </h2>
        <p className="mt-6 leading-7">
          By accessing or using the FitFuel website, you agree to comply with
          and be bound by these Terms of Use and Rules, as well as any
          additional terms and conditions that may apply to specific sections of
          the website or to products and services available through the website.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight">
          2. Use of Content:
        </h2>
        <p className="mt-6 leading-7">
          All content provided on the FitFuel website, including text, graphics,
          images, videos, and other materials, is for informational purposes
          only. This content is not intended to be a substitute for professional
          medical advice, diagnosis, or treatment. Always seek the advice of
          your physician or other qualified health provider with any questions
          you may have regarding a medical condition.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight">
          3. User Accounts:
        </h2>
        <p className="mt-6 leading-7">
          You may be required to create a user account to access certain
          features of the FitFuel website. When creating an account, you agree
          to provide accurate and complete information and to keep your login
          credentials secure. You are responsible for all activity that occurs
          under your account.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight">
          4. Prohibited Conduct:
        </h2>
        <p className="mt-6 leading-7">
          You agree not to engage in any of the following prohibited activities:
        </p>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            Use the FitFuel website for any unlawful purpose or in violation of
            any applicable laws.
          </li>
          <li>
            Post or transmit any content that is harmful, offensive, or
            inappropriate.
          </li>
          <li>
            Attempt to interfere with the proper functioning of the website.
          </li>
          <li>
            Impersonate any person or entity or misrepresent your affiliation
            with any person or entity.
          </li>
          <li>
            Collect or store personal information about other users without
            their consent.
          </li>
        </ul>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight">
          5. Intellectual Property:
        </h2>
        <p className="mt-6 leading-7">
          All content on the FitFuel website, including text, graphics, images,
          videos, and logos, is the property of FitFuel or its licensors and is
          protected by copyright, trademark, and other intellectual property
          laws. You may not reproduce, distribute, or otherwise use any content
          from the website without the express permission of FitFuel.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight">
          6. Links to Third-Party Websites:
        </h2>
        <p className="mt-6 leading-7">
          The FitFuel website may contain links to third-party websites or
          resources. These links are provided for your convenience only and do
          not imply any endorsement by FitFuel. We are not responsible for the
          content or accuracy of any third-party websites, and your use of such
          websites is at your own risk.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight">
          7. Disclaimer of Warranties:
        </h2>
        <p className="mt-6 leading-7">
          The FitFuel website is provided on an "as is" and "as available"
          basis, without any warranties of any kind, either express or implied.
          FitFuel makes no representations or warranties about the accuracy,
          reliability, completeness, or timeliness of the content on the website
          or about the results to be obtained from using the website.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight">
          8. Limitation of Liability:
        </h2>
        <p className="mt-6 leading-7">
          In no event shall FitFuel or its affiliates be liable for any
          indirect, incidental, special, consequential, or punitive damages
          arising out of or in connection with your use of the FitFuel website.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight">
          9. Changes to Terms:
        </h2>
        <p className="mt-6 leading-7">
          FitFuel reserves the right to modify or update these Terms of Use and
          Rules at any time without prior notice. Your continued use of the
          website after any such changes constitutes your acceptance of the new
          terms.
        </p>

        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight">
          10. Governing Law:
        </h2>
        <p className="mt-6 leading-7">
          These Terms of Use and Rules shall be governed by and construed in
          accordance with the laws of [insert jurisdiction]. Any disputes
          arising under these terms shall be subject to the exclusive
          jurisdiction of the courts located in [insert jurisdiction].
        </p>

        <p className="mt-6 leading-7">
          If you have any questions about these Terms of Use and Rules, please
          contact us at [insert contact information]. Thank you for visiting
          FitFuel!
        </p>
      </main>

      <Footer />
    </div>
  );
}
