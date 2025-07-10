import { Form } from 'react-bootstrap';

type SearchFilterFormType = {
  searchTerm: string;
  filterStatus: string;
  setSearchTerm: (v: string) => void;
  setFilterStatus: (v: string) => void;
};

export default function SearchFilterForm({
  searchTerm,
  filterStatus,
  setSearchTerm,
  setFilterStatus,
}: SearchFilterFormType) {
  return (
    <div className="row mb-4">
      <div className="col-md-6">
        <Form.Control
          type="text"
          placeholder="Search by company or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </Form.Select>
      </div>
    </div>
  );
}
