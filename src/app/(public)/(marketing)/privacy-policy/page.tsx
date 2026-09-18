import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  UserCheck,
  CreditCard,
  Database,
  CalendarCheck,
  Star,
} from "lucide-react";
import siteDetails from "@/config/publicSiteData";

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Privacy Policy
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your Privacy Matters to Us
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {siteDetails.name} respects your privacy and is committed to
            protecting your personal information while you use our platform.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: September 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20">
          <div className="space-y-12">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-bold">1. Introduction</h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                {siteDetails.name} is a home-service marketplace that connects
                customers with technicians who provide home services. This
                Privacy Policy explains what information we collect, how we use
                it, and how we protect your information when you use our
                platform.
              </p>
            </section>

            {/* 2 */}
            <section>
              <div className="flex items-center gap-3">
                <UserCheck className="size-6 text-primary" />

                <h2 className="text-2xl font-bold">
                  2. Information We Collect
                </h2>
              </div>

              <p className="mt-4 leading-7 text-muted-foreground">
                When you create an account or use our services, we may collect
                information necessary to provide the platform's functionality.
              </p>

              <ul className="mt-5 list-disc space-y-3 pl-6 text-muted-foreground">
                <li>Name</li>
                <li>Email address</li>
                <li>Password and authentication information</li>
                <li>User role, such as customer or technician</li>
                <li>Technician profile information</li>
                <li>Service and booking information</li>
                <li>Service address and scheduling information</li>
                <li>Reviews, ratings, and comments</li>
                <li>Payment and transaction information</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <div className="flex items-center gap-3">
                <Database className="size-6 text-primary" />

                <h2 className="text-2xl font-bold">
                  3. How We Use Your Information
                </h2>
              </div>

              <p className="mt-4 leading-7 text-muted-foreground">
                We use your information to operate and improve the platform,
                including:
              </p>

              <ul className="mt-5 list-disc space-y-3 pl-6 text-muted-foreground">
                <li>Create and manage user accounts</li>
                <li>Authenticate users securely</li>
                <li>Display available services and categories</li>
                <li>Connect customers with technicians</li>
                <li>Create and manage service bookings</li>
                <li>Manage technician booking requests</li>
                <li>Process service payments</li>
                <li>Process payment gateway callbacks</li>
                <li>Allow customers to submit reviews and ratings</li>
                <li>Provide customer and technician support</li>
                <li>Maintain platform security and prevent abuse</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <div className="flex items-center gap-3">
                <CalendarCheck className="size-6 text-primary" />

                <h2 className="text-2xl font-bold">
                  4. Bookings and Service Information
                </h2>
              </div>

              <p className="mt-4 leading-7 text-muted-foreground">
                When a customer books a service, {siteDetails.name} processes
                information such as the selected service, technician,
                schedule, and service address. This information is used to
                coordinate the requested home service.
              </p>
            </section>

            {/* 5 */}
            <section>
              <div className="flex items-center gap-3">
                <CreditCard className="size-6 text-primary" />

                <h2 className="text-2xl font-bold">
                  5. Payments
                </h2>
              </div>

              <p className="mt-4 leading-7 text-muted-foreground">
                Customers may make payments for their bookings through our
                supported payment gateway. Payment transactions may involve
                third-party payment providers and their systems.
              </p>

              <p className="mt-4 leading-7 text-muted-foreground">
                {siteDetails.name} may receive payment-related information
                required to identify and update the status of a transaction,
                including successful or failed payment callbacks.
              </p>
            </section>

            {/* 6 */}
            <section>
              <div className="flex items-center gap-3">
                <Star className="size-6 text-primary" />

                <h2 className="text-2xl font-bold">
                  6. Reviews and Ratings
                </h2>
              </div>

              <p className="mt-4 leading-7 text-muted-foreground">
                Customers may submit ratings and comments after using a
                service. Reviews may be associated with the relevant booking
                or technician and may be displayed as part of the platform's
                service experience.
              </p>
            </section>

            {/* 7 */}
            <section>
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-primary" />

                <h2 className="text-2xl font-bold">
                  7. Information Sharing
                </h2>
              </div>

              <p className="mt-4 leading-7 text-muted-foreground">
                We only share information when it is necessary to operate the
                platform and provide requested services. For example, relevant
                booking information may be made available to the technician
                responsible for providing the service.
              </p>

              <p className="mt-4 leading-7 text-muted-foreground">
                We may also work with third-party providers for services such
                as payment processing, hosting, authentication, or other
                technical operations.
              </p>
            </section>

            {/* 8 */}
            <section>
              <div className="flex items-center gap-3">
                <Lock className="size-6 text-primary" />

                <h2 className="text-2xl font-bold">
                  8. Data Security
                </h2>
              </div>

              <p className="mt-4 leading-7 text-muted-foreground">
                We take reasonable measures to protect user information from
                unauthorized access, modification, disclosure, or misuse.
                Authentication is used to protect restricted areas of the
                platform.
              </p>

              <p className="mt-4 leading-7 text-muted-foreground">
                However, no internet-based service can guarantee complete
                security of information.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold">
                9. User Accounts
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                Users are responsible for keeping their account credentials
                secure. Users should not share authentication credentials or
                access tokens with other people.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold">
                10. Administrator Access
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                Platform administrators may access certain user and booking
                information when necessary to manage the platform, moderate
                users, manage service categories, and maintain the quality and
                security of the service.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-bold">
                11. Cookies and Authentication
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                {siteDetails.name} may use browser cookies to support
                authentication and maintain user sessions. These cookies help
                authenticated users access protected features of the
                platform.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-2xl font-bold">
                12. Changes to This Privacy Policy
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                We may update this Privacy Policy when our platform,
                services, or data practices change. The updated version will
                be published on this page with a new revision date.
              </p>
            </section>

            {/* 13 */}
            <section className="rounded-2xl border bg-muted/50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold">
                13. Contact Us
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                If you have questions or concerns about this Privacy Policy or
                how {siteDetails.name} handles your information, please contact
                our support team.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-block font-medium text-primary hover:underline"
              >
                Contact {siteDetails.name} →
              </Link>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}