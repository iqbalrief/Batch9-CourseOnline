import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DocumentAddIcon } from '@heroicons/react/solid'
import ApiCourse from './ApiCourse'
import ApiUser from '../users/ApiUser'



export default function AddEditCourse(props) {
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef();

  const [values, setValues] = useState({
      cors_id: undefined,
      cors_name: undefined,   
      cors_description: undefined,
      cors_category: undefined,
      cors_price: undefined,
      cors_duration: undefined,
      cors_total_materi: undefined,
      cors_level: undefined,
      cors_author: undefined,
      cors_rating: undefined,
      cors_image: undefined,
      user_id: undefined,
      error: "",
  });

  const [users, setUsers] = useState([])


  useEffect(() => {
      ApiUser.list().then(data => {
          setUsers(data);
      });

      if (props.course.actionType === 'Edit') {
          ApiCourse.findOne(props.course.cors_id).then(data => {
              if (data.error) {
                  console.log(data.error)
              } else {
                  setValues({
                      ...values,
                      cors_id: data.cors_id,
                      cors_name: data.cors_name,
                      cors_description: data.cors_description,
                             cors_category: data.cors_category,
                             cors_price: data.cors_price,
                             cors_duration: data.cors_duration,
                             cors_total_materi: data.cors_total_materi,
                             cors_level: data.cors_level,
                             cors_author: data.cors_author,
                             cors_rating: data.cors_rating,
                             cors_image: data.cors_image,
                             user_id: data.user_id,
                  })
              }


          });
      }else{
          setValues({
              ...values,
              cors_id: undefined,
              cors_name: undefined,
              cors_description: undefined,
                             cors_category: undefined,
                             cors_price: undefined,
                             cors_duration: undefined,
                             cors_total_materi: undefined,
                             cors_level: undefined,
                             cors_author: undefined,
                             cors_rating: undefined,
                             cors_image: undefined,
                             user_id: undefined,
          })
      }


  }, [props.course.actionType])

 /*  // gunakan useEffect untuk edit region
  useEffect(() => {
      if (props.course.actionType === 'Edit') {
          //call ApiUser.findOne untuk mencari region dengan cors_user_id yg dikirim dari props
          ApiCourse.findOne(props.course.cors_id).then(data => {
              // jika ketemu, ubah values nya, pastikan tambahkan value={values.region_name}
              // di input type region_name agar bisa show value nya
              setValues({ ...values, 
                             cors_id: data.cors_id, 
                             cors_name: data.cors_name,
                             cors_description: data.cors_description,
                             cors_category: data.cors_category,
                             cors_price: data.cors_price,
                             cors_duration: data.cors_duration,
                             cors_total_materi: data.cors_total_materi,
                             cors_level: data.cors_level,
                             cors_author: data.cors_author,
                             cors_rating: data.cors_rating,
                             cors_image: data.cors_image,
                             cors_user_id: data.cors_user_id,
                            })
          })
      } else {
          setValues({ ...values, 
                         cors_id: undefined, 
                         cors_name: "",
                        })
      }
  }, [props.course.actionType]) */



  const handleOnChange = name => event => {
      setValues({ ...values, [name]: event.target.value })
      console.log(`res: ${event.target.value}`);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (props.course.actionType === 'Add') {
        const course = {
            cors_id: undefined,
            cors_name: undefined,
            cors_description: undefined,
                           cors_category: undefined,
                           cors_price: undefined,
                           cors_duration: undefined,
                           cors_total_materi: undefined,
                           cors_level: undefined,
                           cors_author: undefined,
                           cors_rating: undefined,
                           cors_image: undefined,
                           user_id: undefined,
        }

        ApiCourse.create(course).then(data => {
            if (data.error) {
                console.log('create new record failed')
                setValues({ ...values, error: data.error.message })
            } else {
                props.setStatus();
                props.setModal();
            }
        })
    } else if (props.course.actionType === 'Edit') {
        ApiCourse.update(values).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error.message })
            } else {
                props.setStatus();
                props.setModal();
            }
        });
    }


}

  return (
      <Transition.Root show={open} as={Fragment}>
          <Dialog
              as="div"
              static
              className="fixed z-10 inset-0 overflow-y-auto"
              initialFocus={cancelButtonRef}
              open={open}
              onClose={setOpen}
          >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                  >
                      <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                      &#8203;
                  </span>
                  <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                      <DocumentAddIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                  </div>
                                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                          {props.title}
                                      </Dialog.Title>
                                      <div className="mt-2">
                                          {/** code here... */}
                                          <form method="POST" action="#">

                                              <input id="cors_id" name="cors_id"
                                                  value={values.cors_id}
                                                  type="number" placeholder="e.g 1" readOnly />

                                              <input id="cors_name" name="cors_name"
                                                  type="text" placeholder="e.g Asia"
                                                  value={values.cors_name}
                                                  onChange={handleOnChange('cors_name')}
                                              />

                                              <input id="cors_description" name="cors_description"
                                                  type="text" placeholder="e.g Desc"
                                                  value={values.cors_description}
                                                  onChange={handleOnChange('cors_description')}
                                              />

                                              <input id="cors_category" name="cors_category"
                                                  type="text" placeholder="e.g Java/ Javascript / Excel"
                                                  value={values.cors_category}
                                                  onChange={handleOnChange('cors_category')}
                                              />

                                              <input id="cors_price" name="cors_price"
                                                  type="number" placeholder="e.g price"
                                                  value={values.cors_price}
                                                  onChange={handleOnChange('cors_price')}
                                              />

                                                  <input id="cors_duration" name="cors_duration"
                                                  type="text" placeholder="e.g Duration Learning"
                                                  value={values.cors_duration}
                                                  onChange={handleOnChange('cors_duration')}
                                              />

                                                  <input id="cors_total_materi" name="cors_total_materi"
                                                  type="number" placeholder="total materi"
                                                  value={values.cors_total_materi}
                                                  onChange={handleOnChange('cors_total_materi')}
                                              />


                                                  <input id="cors_level" name="cors_level"
                                                  type="text" placeholder="e.g level"
                                                  value={values.cors_level}
                                                  onChange={handleOnChange('cors_level')}
                                              />

                                                  <input id="cors_author" name="cors_author"
                                                  type="text" placeholder="e.g Author"
                                                  value={values.cors_author}
                                                  onChange={handleOnChange('cors_author')}
                                              />
                                              
                                              <input id="cors_rating" name="cors_rating"
                                                  type="number" placeholder="e.g Rating"
                                                  value={values.cors_rating}
                                                  onChange={handleOnChange('cors_rating')}
                                              />
                                              
                                              <input id="cors_image" name="cors_image"
                                                  type="file" placeholder="e.g png/jpg"
                                                  value={values.cors_image}
                                                  onChange={handleOnChange('cors_image')}
                                              />  
                                            
                                            <div>
                                                    <select id="user_id" type="text"
                                                        value={values.user_id}
                                                        onChange={handleOnChange('user_id')}
                                                    >
                                                        <option>Choose User</option>
                                                        {
                                                            users &&
                                                            users.map(data => 
                                                               <option value={data.user_id}>{data.user_name}</option>
                                                            
                                                            )
                                                        }
                                                    </select>
                                                </div>

                                          </form>

                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button
                                  type="button"
                                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                  onClick={onSubmit}
                              >
                                  Submit
                              </button>
                              <button
                                  type="button"
                                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                  onClick={() => props.setModal()}
                                  ref={cancelButtonRef}
                              >
                                  Cancel
                              </button>
                          </div>
                      </div>
                  </Transition.Child>
              </div>
          </Dialog>
      </Transition.Root>
  )
}