// import React from 'react'
// import {render, screen, waitFor} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import 'jest-canvas-mock';

// import UpdateProfile from './UpdateProfile.js'

// test('rendering and submitting a basic Formik form', async () => {
//   const handleSubmit = jest.fn()
//   render(<UpdateProfile onSubmit={handleSubmit} />)

//   userEvent.type(screen.getByRole('text',{cname:/Customer Name/i}), 'Gunjal Gupta')
//   userEvent.type(screen.getByRole('text',{nickname:/Nickname/i}), 'gunjal')
//   userEvent.type(screen.getByRole('text',{email:/email/i}), 'gunjal1gupta@gmail.com')

//   jest.mock('react-redux', () => {
//     const ActualReactRedux = jest.requireActual('react-redux');
//     return {
//         ...ActualReactRedux,
//         useSelector: jest.fn().mockImplementation(() => {
//             return mockState;
//         }),
//     };
// });

//   await waitFor(() =>
//     expect(handleSubmit).toHaveBeenCalledWith({
//       email: 'gunjal1gupta@gmail.com',
//       cname: 'Gunjal Gupta',
//       nickname: 'gunjal',
//     }),
//   )
// })