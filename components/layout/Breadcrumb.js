import Link from "next/link"

export default function Breadcrumb({ breadcrumbTitle }) {
    return (
        <>

        <section className="page-title centred pt_110">
            <div className="auto-container">
                <div className="content-box">
                    <h1>{breadcrumbTitle}</h1>
                    <ul className="bread-crumb clearfix">
                        <li><Link href="/">Home</Link></li>
                        <li>-</li>
                        <li>{breadcrumbTitle}</li>
                    </ul>
                </div>
            </div>
        </section>

        </>
    )
}
