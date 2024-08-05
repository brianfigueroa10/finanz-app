import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <>
        <div className="absolute top-3 flex flex-col opacity-50">
            access
            <span>email:  test1@gmail.com</span>
                <span>password: test@112233</span>

        </div>
    <SignIn path="/sign-in" forceRedirectUrl={"/wizard"} />
        </>
    )
    
}