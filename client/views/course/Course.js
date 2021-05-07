import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import apiCourse from './ApiCourse'
import AddEditCourse from './AddEditCourse'

import {
   PencilAltIcon,
   TrashIcon,
} from '@heroicons/react/solid'


export default function Course () {

  const [courses, setCourses] = useState([]);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(false);
  // digunakan untuk edit region, kita butuh cors_id
  const [course, setCourse] = useState({
      cors_id: undefined,
      actionType: undefined
  })

  useEffect(() => {
      // call api
      apiCourse.list().then(data => {
          //jika response sukses, then fill data to course variable using setCourse
          setCourses(data)
      }).catch(err => {
          console.log(err)
      });

  }, []); //jika useEffect parameter kedua di isi empty array[], useEffect akan di run 1 kali.

  useEffect(() => {

      apiCourse.list().then(data => {
          setCourses(data);
          setStatus(false);
      }).catch(err => {
          console.log(err)
      });

  }, [status]); // jika status berubah maka useEffect di trigger kembali

  const onDelete = async (id) => {
      apiCourse.remove(id).then(result => {
          console.log(result);
          setStatus(true)
      })
  }

  const onCreate = async () => {
      setCourse({
          cors_id: undefined,
          actionType: 'Add'
      })
      setModal(true)
  }

  const onEdit = async (id) => {
      setCourse({
          cors_id: id,
          actionType: 'Edit'
      })
      setModal(true)
  }



  return (
      <div>
          <PageHeader title={'Course'} setModal={() => onCreate()} />
          <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                  <tr>
                                     
                                     
                                  <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Id
                                      </th>

                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Name
                                      </th>

                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Description
                                      </th>

                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Category
                                      </th>

                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Price
                                      </th>
                                      
                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Duration
                                      </th>

                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Total Materi
                                      </th>

                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Level
                                      </th>

                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Author
                                      </th>

                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Rating
                                      </th>

                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course Image
                                      </th>

                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Course User ID
                                      </th>

                                      <th
                                          className="px-6 py-3 col-span-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Action
                                      </th>

                                  </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                  {courses.map((data) => (
                                      <tr key={data.cors_id}>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_id}</div>
                                          </td>
                                          
                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_name}</div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_description}</div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_category}</div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_price}</div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_duration}</div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_total_materi}</div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_level}</div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_author}</div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_rating}</div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_image}</div>
                                          </td>

                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cors_user_id}</div>
                                          </td>
                                          
                                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                                  <span className="hidden sm:block mr-2">
                                                      <button
                                                          onClick={() => {
                                                              onEdit(data.cors_id)
                                                          }}
                                                          type="button"
                                                          className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                      >
                                                          <PencilAltIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                                      </button>
                                                  </span>
                                                  <span className="hidden sm:block">
                                                      <button
                                                          onClick={() => {
                                                              if (
                                                                  window.confirm(
                                                                      "Are you sure you wish to delete this item?"
                                                                  )
                                                              )
                                                                  onDelete(data.cors_id)
                                                          }}
                                                          type="button"
                                                          className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                      >
                                                          <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                                      </button>
                                                  </span>
                                              </div>
                                          </td>

                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>

          {modal ? <AddEditCourse
              title={'Add Course'}
              setModal={() => setModal(false)}
              setStatus={() => setStatus(true)}
              course={course}
          /> : null}

      </div>
   )
}