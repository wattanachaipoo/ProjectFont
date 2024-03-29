import axios from "axios";
import { useState } from "react";

export default function New() {
  const [input, setInput] = useState({
    number_of_guests: '',
    start_date: '',
    end_date: '',
    room_type: '',
    price: '',
  });

  const [roomImage, setRoomImage] = useState('');

  const hdlChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const hdlRoomSelect = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    // เปลี่ยนรูปภาพตามที่เลือก
    switch (e.target.value) {
      case 'standard':
        setRoomImage('https://www.zazahotel2019.com/wp-content/uploads/2019/09/1bed.png');
        break;
      case 'deluxe':
        setRoomImage('https://media.onyx-hospitality.com/-/media/project/amari/common/property/pattaya/hotel-photos/stay/deluxe-ocean-view/deluxe-ocean-view-king-1.jpg?rev=-1');
        break;
      case 'suite':
        setRoomImage('https://blog.amari.com/wp-content/uploads/2020/01/executive-suite-ocean-view-2.jpg');
        break;
      default:
        setRoomImage('');
        break;
    }
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      const output = {
        ...input,
        start_date: new Date(input.start_date),
        end_date: new Date(input.end_date)
      };
      const token = localStorage.getItem('token');
      const rs = await axios.post('http://localhost:8889/reservation', output, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('จองเสร็จสิ้น');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-[url('/img/reser.jpg')] h-screen bg-cover">
      <div className="bg-cover min-h-screen flex justify-center items-center">
        <form
          className="bg-white shadow-md px-8 pt-6 pb-8 w-3/6 rounded-lg"
          onSubmit={hdlSubmit}
          method="post"
        >
          <div className="text-3xl mb-5 text-center font-bold text-black">ข้อมูลการจอง</div>
          <div className="mb-4 form-control w-full max-w-xs mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_date ">
              จองตั้งแต่วันที่
            </label>
            <input
              className="input input-bordered w-full max-w-xs bg-white text-black"
              id="start_date"
              type="date"
              name="start_date"
              value={input.start_date}
              onChange={hdlChange}
            />
          </div>

          <div className="mb-4 form-control w-full max-w-xs mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end_date">
              สิ้นสุด
            </label>
            <input
              className="input input-bordered w-full max-w-xs bg-white text-black"
              id="end_date"
              type="date"
              name="end_date"
              value={input.end_date}
              onChange={hdlChange}
            />
          </div>

          <div className="mb-4 form-control w-full max-w-xs mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number_of_guests">
              จำนวนคนเข้าพัก
            </label>
            <input
              className="input input-bordered w-full max-w-xs bg-white text-black"
              id="number_of_guests"
              type="text"
              name="number_of_guests"
              value={input.number_of_guests}
              onChange={hdlChange}
            />
          </div>
          <div className="mb-4 form-control w-full max-w-xs mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
              เลือกเลขห้อง
            </label>
            <select
              className="input input-bordered w-full max-w-xs bg-white text-black"
              id="number"
              name="number"
              value={input.number}
              onChange={hdlChange}
            >
             <option value="">โปรดเลือก</option>
              <option value="230">230</option>
              <option value="240">240</option>
              <option value="250">250</option>
              <option value="260">260</option>
              <option value="270">270</option>
            </select>
          </div>
          <div className="mb-4 form-control w-full max-w-xs mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room_type">
              ประเภทห้อง
            </label>
            <select
              className="input input-bordered w-full max-w-xs bg-white text-black"
              id="room_type"
              name="room_type"
              value={input.room_type}
              onChange={hdlRoomSelect}
            >
              <option value="">โปรดเลือก</option>
              <option value="standard">มาตรฐาน</option>
              <option value="deluxe">ดีลักซ์</option>
              <option value="suite">สวีท</option>
            </select>
          </div>
            {roomImage && (
              <div className="flex justify-center">
                <img src={roomImage} alt="Room" className="max-w-xs mx-auto" />
              </div>
            )}
          <div className="mb-4 form-control w-full max-w-xs mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              ราคา
            </label>
            <select
              className="input input-bordered w-full max-w-xs bg-white text-black"
              id="price"
              name="price"
              value={input.price}
              onChange={hdlChange}
            >
              <option value="">โปรดเลือก</option>
              <option value="1000">1,000 บาท</option>
              <option value="2000">2,000 บาท</option>
              <option value="3000">3,000 บาท</option>
            </select>
          </div>
          <div className="flex items-center justify-between form-control w-full max-w-xs mx-auto">
            <button
              className=" bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            > บันทึก
            </button>
            <a href="/" className=" bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">ย้อนกลับ</a>
          </div>
        </form>
      </div>
    </div>
  )
}
