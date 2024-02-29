class CreateJobs < ActiveRecord::Migration[7.1]
  def change
    create_table :jobs do |t|
      t.string :name
      t.string :title
      t.string :shortDescription
      t.string :longDescription
      t.string :logo
      t.string :status

      t.timestamps
    end
  end
end
