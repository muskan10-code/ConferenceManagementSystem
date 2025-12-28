import React from 'react';

const ConferenceTable = (props) => {
  const { conferenceDetails } = props;
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold p-4 bg-blue-600 text-white">
        {conferenceDetails.heading}
      </h2>
      <table className="w-full">
        <tbody>
          {conferenceDetails.details.map((detail, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="p-4 flex items-center">
                {detail.icon}
                <span className="ml-2 font-medium">{detail.label}</span>
              </td>
              <td className="p-4">{detail.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConferenceTable;
