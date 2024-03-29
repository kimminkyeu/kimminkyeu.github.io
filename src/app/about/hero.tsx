import Image from 'next/image';

export default function Hero() {
  return (<div></div>);
}

/*
export default function Hero() {
  return (
    <>
      <section className="min-w-screen body-font flex flex-col text-gray-600">
        <div className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
          <div className="mb-10 w-5/6 md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg">
            <Image
              src="/assets/about_me_1.jpeg"
              alt="Picture of the author"
              width={350}
              height={350}
              // layout="fill"
              sizes="(max-width: 768px) 100vw,
        					       (max-width: 1200px) 50vw,
            					   33vw"
            />
          </div>

          <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:pl-16 md:text-left lg:flex-grow lg:pl-24">
            <h1 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
              자기소개
            </h1>
            <p className="mb-8 leading-relaxed">
              내 깃헙 링크와 함께 어떤 공부를 했고, 42를 했고 멤버이고 기타
              등등...
            </p>
            <div className="flex justify-center">
              <a
                href="https://github.com/kimminkyeu"
                target="_blank"
                rel="noreferrer"
              >
                <button className="inline-flex border-0 bg-gray-100 px-6 py-2 text-lg text-gray-700 hover:bg-gray-200 focus:outline-none">
                  https://github.com/kimminkyeu
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );


*/