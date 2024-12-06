interface Menu {
  id: string;
  label: string;
}

const navigations: Menu[] = [];

const Navbar = () => {
  return (
    <nav className='w-full h-14 bg-dark/80'>
      <div className='fixed container w-full h-14 top-0 left-0 right-0 m-auto flex items-center justify-between z-40'>
        <span className='font-semibold text-xl'>Parkirin</span>
        {/* <div className='md:hidden text-white cursor-pointer'>
          <IoMdMenu />
        </div> */}
        <div className='nav-menu'>
          <ul className='flex items-center gap-8 text-white'>
            {navigations.map((item) => {
              return (
                <li
                  key={item.id}
                  className='cursor-pointer py-1 px-2 rounded hover:bg-dark-secondary hover:shadow-lg'
                  // onClick={() => onScrollTo(item.id)}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
