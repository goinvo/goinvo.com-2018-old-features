module DataHelper
  def client_for_name(client_name)
    data.clients.clients.select { |c| c.name == client_name }.first
  end
  
  def practice_areas(project)
    project.practice_area_names.split(',').map(&:strip)
  end
end
