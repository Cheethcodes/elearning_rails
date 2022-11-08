export const AuthCard = ({ redirect, children }) => (
  <div className='auth-screen'>
    <div className='auth-card rounded-3xl w-full mx-auto px-10 py-10 bg-white' style={{ maxWidth: '900px', backgroundColor: '#F5F6FA' }}>
      <div className='flex justify-between mb-4'>
        <h4 className='text-lg font-bold text-primary text-left'>{process.env.REACT_APP_NAME}</h4>
        <a
          href={redirect === 'Login' ? '/' : '/register'}
          className='hover:border-primary hover:text-primary text-slate-300 border border-slate-300'
          style={{ padding: '6px 15px' }}>
          {redirect}
        </a>
      </div>
      {children}
    </div>
  </div>
)
